Faceit AI Bot

## Тестирование

### Backend
Для запуска тестов backend выполните:
```bash
pytest tests/test_payments.py
```

### Frontend
Для запуска тестов frontend выполните:
```bash
npm test
```

## API

### Эндпоинты
- `POST /payments/yookassa` — Создание платежа через YooKassa.
- `POST /payments/sbp` — Создание платежа через СБП.
- `GET /health` — Проверка состояния сервиса.







