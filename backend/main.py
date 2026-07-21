from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.auth import get_password_hash, verify_password
from app.database import create_tables, get_db
from app.models import User
from app.schemas import TokenResponse, UserCreate, UserLogin

app = FastAPI(title="Auth Starter API")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1|0\.0\.0\.0|.*\.netlify\.app|.*\.vercel\.app|.*\.railway\.app|.*\.render\.com|.*\.fly\.dev|.*\.up\.railway\.app)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event() -> None:
    create_tables()


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post(
    "/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED
)
def register(user_data: UserCreate, db: Session = Depends(get_db)) -> TokenResponse:
    existing_user = db.query(User).filter(User.email == user_data.email.lower()).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=user_data.email.lower(),
        hashed_password=get_password_hash(user_data.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return TokenResponse(
        message="User registered successfully", user_id=user.id, email=user.email
    )


@app.post("/login", response_model=TokenResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.query(User).filter(User.email == user_data.email.lower()).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return TokenResponse(message="Login successful", user_id=user.id, email=user.email)
