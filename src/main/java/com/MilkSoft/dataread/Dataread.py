import pandas as pd
import os

file_name = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Report.csv")

# Check if the file exists and is not empty
if os.path.exists(file_name) and os.path.getsize(file_name) > 0:
    data = pd.read_csv(file_name, sep=',')  # Use ',' as the separator
    # Check if the DataFrame only contains the column headers
    if data.empty:
        print("The CSV file only contains the column headers.")
    else:
        print("The CSV file contains data.")

        print(data.head())  # Moved inside the 'if' block to access 'data'

        # Extract categorical and numerical variables
        categorical_data = data[['Breed', 'City', 'Month']]
        numerical_data = data[['AverageTemperature', 'AverageWet']]  # Corrected column names

        # Convert 'AverageTemperature' to numeric
        data['AverageTemperature'] = pd.to_numeric(data['AverageTemperature'], errors='coerce')

        # Now you can filter the data
        condition = (data['AverageTemperature'] > 20)  # replace with your actual condition
        filtered_data = data[condition]

        # Define bins
        bins = pd.cut(data['AverageTemperature'], bins=5)  # Divide temperature into 5 ranges

        # Convert 'DailyMilkProduction' to numeric
        data['DailyMilkProduction'] = pd.to_numeric(data['DailyMilkProduction'], errors='coerce')

        # Filter data based on some condition
        condition = (data['AverageTemperature'] > 20)  # replace with your actual condition
        filtered_data = data[condition]

        # Define bins
        bins = pd.cut(filtered_data['AverageTemperature'], bins=5)  # Divide temperature into 5 ranges

        # Combine categorical and numerical data (optional)
        combined_data = pd.concat([categorical_data, numerical_data], axis=1)

        # Group by bins and calculate mean
        grouped_temp = filtered_data.groupby(bins, observed=True)['DailyMilkProduction'].mean()

        # Get unique breeds and cities
        breeds = data['Breed'].unique()
        cities = data['City'].unique()

        # Analyze data for each city
        for city in cities:
            city_data = data[data['City'] == city]

            # Find the breed that produces the most milk in this city
            avg_milk_by_breed = city_data.groupby('Breed')['DailyMilkProduction'].mean()
            most_efficient_breed = avg_milk_by_breed.idxmax()
            most_efficient_breed_milk_production = avg_milk_by_breed.max()

            print(f"In {city}, the most efficient breed is {most_efficient_breed} with an average daily milk production of {most_efficient_breed_milk_production} liters.")

        # Analyze data for each breed
        for breed in breeds:
            breed_data = data[data['Breed'] == breed]

            # Group by 'AverageTemperature' and calculate average daily milk production
            bins = pd.cut(breed_data['AverageTemperature'], bins=5)  # Divide temperature into 5 ranges
            avg_milk_by_temp = breed_data.groupby(bins, observed=True)['DailyMilkProduction'].mean()

            # Find the temperature range with the highest and lowest average daily milk production
            max_milk_temp = avg_milk_by_temp.idxmax()
            min_milk_temp = avg_milk_by_temp.idxmin()

            print(f"{breed} produces the most milk at temperatures in the range {max_milk_temp} and the least milk at temperatures in the range {min_milk_temp}.")
else:
    print("The CSV file does not exist or is empty.")
