from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Faceit AI Bot ML Service", version="0.1.0")

# Configure CORS for development and production
origins = [
    "http://localhost:5000",
    "http://localhost:4000",
    "https://89f4cd76-9b36-4cb9-9797-f7bf95690841-00-3isporgvi3p56.picard.replit.dev",
]

# Allow all Replit domains in development
if os.getenv("NODE_ENV") == "development" or os.getenv("REPLIT_DEV_DOMAIN"):
    origins.append("*")  # Allow all origins in development

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Faceit AI Bot AI/ML сервис работает!", "status": "healthy"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ai-ml"}

@app.post("/analyze-demo")
async def analyze_demo(demo: UploadFile = File(...)):
    """
    Анализ демки CS2
    """
    if not demo.filename.endswith('.dem'):
        return {"error": "Invalid file format. Only .dem files are supported"}
    
    # Симуляция анализа демки
    # В реальной реализации здесь был бы код для парсинга и анализа демки
    mock_analysis = {
        "filename": demo.filename,
        "kd_ratio": 1.24,
        "accuracy": 68.3,
        "rating": 7.8,
        "matches_analyzed": 1,
        "performance_score": 85,
        "recommendations": [
            "Улучшите позиционирование на карте - слишком много смертей от спины",
            "Работайте над точностью стрельбы - много промахов по головам",
            "Улучшите экономику - покупайте броню чаще",
            "Больше используйте утилиты (гранаты, флешки) для поддержки команды"
        ],
        "map_performance": {
            "dust2": 8.2,
            "mirage": 6.5,
            "inferno": 9.1
        },
        "weapon_stats": {
            "ak47": {"accuracy": 72, "kills": 15},
            "m4a4": {"accuracy": 68, "kills": 8},
            "awp": {"accuracy": 83, "kills": 12}
        }
    }
    
    return mock_analysis

@app.post("/generate-training")
async def generate_training(user_stats: dict):
    """
    Генерация персонализированного плана тренировок
    """
    # Анализируем статистику игрока и генерируем план тренировок
    mock_training_plan = {
        "player_level": "intermediate",
        "focus_areas": ["aim", "positioning", "game_sense"],
        "daily_exercises": [
            {
                "name": "Aim Training - Headshot Only",
                "duration": 30,
                "description": "Тренировка точности стрельбы в голову на карте aim_botz"
            },
            {
                "name": "Crosshair Placement",
                "duration": 20,
                "description": "Практика правильного расположения прицела"
            },
            {
                "name": "Spray Control",
                "duration": 25,
                "description": "Отработка контроля отдачи для AK-47 и M4A4"
            }
        ],
        "weekly_goals": [
            "Увеличить точность стрельбы на 5%",
            "Снизить количество смертей от спины на 20%",
            "Улучшить K/D соотношение до 1.3"
        ],
        "estimated_improvement_time": "2-3 недели"
    }
    
    return mock_training_plan

@app.get("/voice-assistant/commands")
async def get_voice_commands():
    """
    Получить доступные голосовые команды
    """
    commands = {
        "available_commands": [
            {"command": "analyze round", "description": "Анализ текущего раунда"},
            {"command": "team strategy", "description": "Рекомендации по командной тактике"},
            {"command": "economy advice", "description": "Советы по экономике"},
            {"command": "position check", "description": "Проверка позиции"},
            {"command": "utility usage", "description": "Советы по использованию утилит"}
        ],
        "languages_supported": ["ru", "en"],
        "status": "active"
    }
    
    return commands

# TODO: добавить реальную обработку голосовых команд и интеграцию с моделями ML
