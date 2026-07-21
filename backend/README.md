# Backend setup

## Run locally

1. Create and activate a virtual environment.
2. Install dependencies:
   `pip install -r requirements.txt`
3. Start PostgreSQL and create a database named `authdb`.
4. Run the API:
   `uvicorn main:app --reload`

## Environment

Set `DATABASE_URL` if your PostgreSQL credentials differ.
