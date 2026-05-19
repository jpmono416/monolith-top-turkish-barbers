# Feature Module Template (API)

```
apps/api/src/features/<feature>/
├── <feature>.module.ts
├── <feature>.controller.ts
├── <feature>.service.ts
├── dto/
│   ├── create-<feature>.dto.ts
│   └── update-<feature>.dto.ts
└── <feature>.service.spec.ts
```

Register the module in `app.module.ts`.

Do not add business logic in controllers. Use Prisma via `PrismaService` in services.
