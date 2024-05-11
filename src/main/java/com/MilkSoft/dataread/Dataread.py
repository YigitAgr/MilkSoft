#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import time
import numpy as np
import mlxtend
from mlxtend.frequent_patterns import apriori, association_rules
from apyori import apriori as apyori_apriori
import os


file_name = "Report.csv"


# Check if the file exists and is not empty
if os.path.exists(file_name) and os.path.getsize(file_name) > 0:
    data = pd.read_csv(file_name, sep=';')
    # Check if the DataFrame only contains the column headers
    if data.empty:
        print("The CSV file only contains the column headers.")
    else:
        print("The CSV file contains data.")
else:
    print("The CSV file does not exist or is empty.")


column_names = ["Breed", "City", "Month", "AverageTemparature", "AverageWet", "DailyMilkProduction"]

data = pd.read_csv(file_name, sep=';')
print(data.head())

if type(data) == pd.core.frame.DataFrame:
    data_column = data.iloc[:, 0]  # Extract the first column
    data_values = [row.split(";") for row in data_column]
else:
    rows = data.splitlines()
    data_values = [row.split(";") for row in rows]

data_dicts = [{column: value for column, value in zip(column_names, row)} for row in data_values]

df = pd.DataFrame(data_dicts)

print(df.head())
print(df.info())
print("Data loaded successfully!zaaaaaaaaaaaaaaaaaaaaa")

# Extract categorical and numerical variables
categorical_data = df[['Breed', 'City', 'Month']]
numerical_data = df[['AverageTemparature', 'AverageWet']]

# Convert 'AverageTemparature' to numeric
df['AverageTemparature'] = pd.to_numeric(df['AverageTemparature'], errors='coerce')

# Now you can filter the data
condition = (df['AverageTemparature'] > 20)  # replace with your actual condition
filtered_data = df[condition]

# Define bins
bins = pd.cut(df['AverageTemparature'], bins=5)  # Divide temperature into 5 ranges

# Convert 'DailyMilkProduction' to numeric
df['DailyMilkProduction'] = pd.to_numeric(df['DailyMilkProduction'], errors='coerce')

# Convert 'AverageTemparature' and 'DailyMilkProduction' to numeric
df['AverageTemparature'] = pd.to_numeric(df['AverageTemparature'], errors='coerce')
df['DailyMilkProduction'] = pd.to_numeric(df['DailyMilkProduction'], errors='coerce')

# Filter data based on some condition
condition = (df['AverageTemparature'] > 20)  # replace with your actual condition
filtered_data = df[condition]

# Define bins
bins = pd.cut(filtered_data['AverageTemparature'], bins=5)  # Divide temperature into 5 ranges

# Combine categorical and numerical data (optional)
combined_data = pd.concat([categorical_data, numerical_data], axis=1)

# Group by bins and calculate mean
grouped_temp = filtered_data.groupby(bins, observed=True)['DailyMilkProduction'].mean()


# Get unique breeds and cities
breeds = df['Breed'].unique()
cities = df['City'].unique()

# Analyze data for each city
for city in cities:
    city_data = df[df['City'] == city]

    # Find the breed that produces the most milk in this city
    avg_milk_by_breed = city_data.groupby('Breed')['DailyMilkProduction'].mean()
    most_efficient_breed = avg_milk_by_breed.idxmax()
    most_efficient_breed_milk_production = avg_milk_by_breed.max()

    print(f"In {city}, the most efficient breed is {most_efficient_breed} with an average daily milk production of {most_efficient_breed_milk_production} liters.")
# Analyze data for each breed
for breed in breeds:
    breed_data = df[df['Breed'] == breed]

    # Group by 'AverageTemparature' and calculate average daily milk production
    bins = pd.cut(breed_data['AverageTemparature'], bins=5)  # Divide temperature into 5 ranges
    avg_milk_by_temp = breed_data.groupby(bins, observed=True)['DailyMilkProduction'].mean()

    # Find the temperature range with the highest and lowest average daily milk production
    max_milk_temp = avg_milk_by_temp.idxmax()
    min_milk_temp = avg_milk_by_temp.idxmin()

    print(f"{breed} produces the most milk at temperatures in the range {max_milk_temp} and the least milk at temperatures in the range {min_milk_temp}.")



# In[ ]:


import sys
print(sys.executable)

