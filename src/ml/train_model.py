import os
from models.recommendation_model import *

if __name__ == "__main__":
    if not os.path.exists('user_data.csv'):
        print("Dataset not found. Please provide 'user_data.csv' in the project root.")
    else:
        print("Training the recommendation model...")
        # The training logic is already in the imported script
        print("Model training completed.")