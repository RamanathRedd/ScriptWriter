import hashlib


def normalize_password(password: str) -> str:
    return password.strip()


def get_password_hash(password: str) -> str:
    normalized_password = normalize_password(password)
    return hashlib.sha256(normalized_password.encode("utf-8")).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    normalized_password = normalize_password(plain_password)
    return get_password_hash(normalized_password) == hashed_password
