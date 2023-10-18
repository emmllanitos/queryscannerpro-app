import re


def extQuery(data):

    queries = []
    
    regexSQL = r"(?s)SELECT.*?;"

    queries.extend(re.findall(regexSQL, data, re.IGNORECASE))

    queries = list(queries)

    for query in queries:
        tables = []
        regexFROM = r"\bFROM\s+(\w+\.\w+|\w+)\b"
        regexJOIN = r"\bJOIN\s+(\w+(?:\.\w+)?)(?:\s+|\n|$)"
        regexFROM2 = r'#\w+\.\$?\w+#\.\w+'
        regexFROM3 = r'#\S+#\.\S+#'
        tables.extend(re.findall(regexFROM, query, re.IGNORECASE))
        tables.extend(re.findall(regexJOIN, query, re.IGNORECASE))
        tables.extend(re.findall(regexFROM2, query, re.IGNORECASE))
        tables.extend(re.findall(regexFROM3, query, re.IGNORECASE))
        tables = list(set(tables))
        print(tables)

    print(len(queries))

    return True
