#/usr/bin/env python
# -*- coding: UTF-8 -*-
# Last modified: 

"""read in Table01.csv and Table01-*.csv, compute the mean, standard deviation, correlations, and line of regression, and output them in several clean csv files
"""

import json
import numpy as np
import pandas as pd
from io import StringIO

def read_table(rawfile1, rawfile2):
    """read Wine tables into a dataframe"""
    df1 = pd.read_csv(rawfile1, na_values=[''])
    df1.fillna(0, inplace=True)
    df2 = pd.read_csv(rawfile2, na_values=[''])
    df2.fillna(0, inplace=True)

    frames = [df1, df2]
    df = pd.concat(frames, keys=['red', 'white'])

    df.reset_index(level=0, inplace=True)
    df["level_0"] = df["level_0"].astype('category')
    df.rename(columns={'level_0': 'Type'}, inplace=True)
    return df

def metadata(df):
    print list(df)
    dict = {
            'color': ['Type', 'quality'],
            'category': ['Type', 'quality'],
            'number of category data': 2, 
            'number of numerical data': 11, 
            'numerical': ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH', 'sulphates', 'alcohol']}
    with open('../clean_data/metadata_wine.json', 'w') as fp:
        json.dump(dict, fp)
    

if __name__ == '__main__':


    df = read_table("../raw_data/winequality-red.csv", "../raw_data/winequality-white.csv")
    df.to_csv("../clean_data/data_wine.csv", index=False)
    metadata(df)


