# Oracle Integration Guide - Complete Setup

This guide explains how to integrate the Oracle automated setup with your entire NestJS backend project.

## 📦 Project Structure

```
hostel-api/
├── src/
│   ├── oracle/                    # ← New Oracle module
│   │   ├── oracle.service.ts      # Core service with setup logic
│   │   ├── oracle.controller.ts   # REST API endpoints
│   │   ├── oracle.module.ts       # NestJS module
│   │   ├── oracle-config.service.ts # Configuration service
│   │   ├── dto/
│   │   │   └── sqlplus-config.dto.ts
│   │   ├── utils/
│   │   │   └── sqlplus.util.ts    # SQL*Plus wrapper
│   │   ├── sql/
│   │   │   ├── create-pdb.sql
│   │   │   ├── open-pdb.sql
│   │   │   ├── create-user.sql
│   │   │   └── verify.sql
│   │   ├── ORACLE_SETUP_GUIDE.md
│   │
│   ├── app.module.ts              # ← OracleModule already imported
│   ├── auth/
│   ├── bookings/
│   ├── hostels/
│   ├── users/
│   ├── payment/
│   ├── notification/
│   └── ...
├── .env.example                   # ← Configuration template
├── ORACLE_QUICKSTART.md           # ← Quick start guide
└── ...
```

## 🔄 Integration Flow

### 1. Automatic Initialization

When the server starts, the OracleModule automatically:
- Loads SQL*Plus configuration from environment variables
- Initializes the SqlPlusUtil with proper connection parameters
- Validates configuration and warns about missing credentials

### 2. Configuration Hierarchy

```
.env file (most specific)
    ↓
OracleConfigService (reads from ConfigModule)
    ↓
OracleService (uses configuration)
    ↓
SqlPlusUtil (executes commands)
```

### 3. Available Services

All services are exported from the module and injectable:

```typescript
// In any NestJS service/controller
import { OracleService } from './oracle/oracle.service';
import { OracleConfigService } from './oracle/oracle-config.service';

@Injectable()
export class MyService {
  constructor(
    private oracleService: OracleService,
    private oracleConfigService: OracleConfigService,
  ) {}
}
```

## 🚀 Complete Setup Walkthrough

### Phase 1: Initial Environment Setup

**File: `.env`**
```bash
# Database for application (TypeORM connection)
DB_HOST=localhost
DB_PORT=1521
DB_USERNAME=hostel_admin
DB_PASSWORD=admin_password
DB_SERVICE_NAME=hostelpdb
DB_SYNCHRONIZE=false

# SQL*Plus for automated setup
SQLPLUS_USERNAME=sys
SQLPLUS_PASSWORD=oracle
SQLPLUS_CONNECT_STRING=localhost:1521/orcl
```

### Phase 2: Start Application

```bash
cd hostel-api
npm install
npm run start:dev
```

**Console Output:**
```
[NestFactory] Starting Nest application...
[OracleService] OracleService initialized with configuration
[NestApplication] Nest application successfully started
Server running on http://localhost:3000
```

### Phase 3: Run Automated Setup

```bash
# Test connection first
curl http://localhost:3000/oracle/test-connection

# Run complete setup
curl -X POST http://localhost:3000/oracle/setup
```

### Phase 4: Verify Setup

```bash
# List PDBs
curl http://localhost:3000/oracle/pdbs

# Check specific PDB
curl http://localhost:3000/oracle/pdbs/hostelpdb

# Get PDB info
curl http://localhost:3000/oracle/pdbs/hostelpdb/info
```

### Phase 5: Update Application Configuration

Once PDB is created, the database is ready to use:

```typescript
// TypeORM will connect using DB_* environment variables
// Connection string: hostel_admin@localhost:1521/hostelpdb
```

## 🔧 Advanced Configuration

### Custom SQL*Plus Commands

```typescript
// In your service
constructor(private oracleService: OracleService) {}

async customDatabaseSetup() {
  // Execute custom SQL
  const result = await this.oracleService.executeSql(
    'CREATE TABLE my_table (id NUMBER, name VARCHAR2(100))'
  );
  
  if (result.success) {
    console.log('Table created:', result.output);
  } else {
    console.error('Creation failed:', result.error);
  }
}
```

### Runtime Configuration Updates

```typescript
// Update configuration at runtime
this.oracleService.setSqlPlusConfig({
  username: 'newuser',
  password: 'newpassword',
  connectString: 'newhostname:1521/orcl'
});

// Get current configuration
const config = this.oracleService.getSqlPlusConfig();
```

## 📊 API Reference

All endpoints are under `/oracle` prefix:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/oracle/test-connection` | Test database connectivity |
| POST | `/oracle/config` | Update SQL*Plus configuration |
| GET | `/oracle/config` | Get current configuration |
| POST | `/oracle/setup` | Run automated setup flow |
| GET | `/oracle/pdbs` | List all PDBs |
| GET | `/oracle/pdbs/{name}` | Check if PDB exists |
| GET | `/oracle/pdbs/{name}/info` | Get PDB details |
| POST | `/oracle/execute` | Execute custom SQL |

## 🔐 Security & Production Considerations

### Environment Variables

```bash
# Production: Use strong, random passwords
SQLPLUS_PASSWORD=<STRONG_RANDOM_PASSWORD>
DB_PASSWORD=<STRONG_RANDOM_PASSWORD>

# Never hardcode passwords
# Use AWS Secrets Manager, HashiCorp Vault, etc.
```

### API Protection

```typescript
// Restrict Oracle endpoints to admin users only
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './common/guards/roles.guard';
import { Roles } from './common/decorators/roles.decorator';

@Controller('oracle')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OracleController {
  @Post('setup')
  @Roles('ADMIN')
  async setupDatabase() {
    // Only admins can run setup
  }
}
```

### Logging & Monitoring

```typescript
// Sensitive data is automatically masked
// Error logs never expose passwords or connection details
// All operations are logged with timestamps
```

## 🧪 Testing

### Unit Tests

```typescript
describe('OracleService', () => {
  let service: OracleService;
  let configService: OracleConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OracleService,
        OracleConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // Mock environment variables
            }),
          },
        },
      ],
    }).compile();

    service = module.get<OracleService>(OracleService);
  });

  it('should test connection', async () => {
    const result = await service.testConnection();
    expect(result.success).toBe(true);
  });
});
```

### E2E Tests

```typescript
describe('Oracle Setup (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /oracle/setup', () => {
    return request(app.getHttpServer())
      .post('/oracle/setup')
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
      });
  });
});
```

## 📈 Scaling & Performance

### Connection Pooling

The current implementation uses command-line execution. For production, consider:

```typescript
// Future: Use OracleDB library for connection pooling
import * as oracledb from 'oracledb';

// This would improve performance significantly
```

### Batch Operations

For multiple SQL operations, combine them:

```typescript
const commands = [
  'CREATE TABLE users (id NUMBER, name VARCHAR2(100))',
  'CREATE TABLE bookings (id NUMBER, user_id NUMBER)',
  'CREATE INDEX idx_bookings_user ON bookings(user_id)',
];

const result = await this.sqlPlusUtil.executeSqlScript(commands);
```

## 🐛 Debugging

### Enable Verbose Logging

```bash
# In development
export DEBUG=oracle:*
npm run start:dev
```

### Check Configuration

```bash
curl http://localhost:3000/oracle/config
```

### Manual SQL*Plus Test

```bash
# Test connection manually
sqlplus sys/oracle@localhost:1521/orcl as sysdba
```

## 📝 Customizing SQL Scripts

Edit scripts in `src/oracle/sql/`:

1. **create-pdb.sql** - Modify PDB parameters
2. **create-user.sql** - Add/remove privileges
3. **verify.sql** - Add verification checks

Changes take effect immediately on next setup call.

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Oracle Setup
on: [push]

jobs:
  setup:
    runs-on: ubuntu-latest
    services:
      oracle:
        image: oracle/database:21.3.0-se2
        env:
          ORACLE_PWD: ${{ secrets.ORACLE_PASSWORD }}
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: curl -X POST http://localhost:3000/oracle/setup
        env:
          SQLPLUS_PASSWORD: ${{ secrets.ORACLE_PASSWORD }}
```

## 🆕 Adding Custom Setup Steps

Extend the service:

```typescript
// src/oracle/oracle.service.ts - Add new method

async customSetup(): Promise<ExecutionResult> {
  // Add your custom setup logic
  const result = await this.executeSql('CREATE TABLESPACE ts1 ...');
  return result;
}
```

Add endpoint:

```typescript
// src/oracle/oracle.controller.ts

@Post('custom-setup')
async customSetup() {
  return await this.oracleService.customSetup();
}
```

## 📚 Related Documentation

- [ORACLE_SETUP_GUIDE.md](./src/oracle/ORACLE_SETUP_GUIDE.md) - Detailed API documentation
- [ORACLE_QUICKSTART.md](./ORACLE_QUICKSTART.md) - Quick start guide
- [NestJS Documentation](https://docs.nestjs.com/)
- [Oracle Database Docs](https://docs.oracle.com/database/)

## ✅ Verification Checklist

Before going to production:

- [ ] Environment variables configured correctly
- [ ] Oracle database running and accessible
- [ ] SQL*Plus installed on server
- [ ] SYS password tested and verified
- [ ] Automated setup flow completes successfully
- [ ] PDB created and accessible
- [ ] App user created with proper privileges
- [ ] TypeORM connection configured
- [ ] API endpoints secured with authentication
- [ ] Passwords stored in secrets management
- [ ] SSL/TLS enabled for production
- [ ] Backup strategy in place
- [ ] Monitoring and logging configured

## 🎯 Next Steps

1. Configure your `.env` file
2. Start the application
3. Run the automated setup
4. Configure TypeORM for app database connection
5. Create your application entities and migrations
6. Test with real data
7. Deploy to production with proper security measures
