import re


def extQuery(data):

    result = {"table": []}
    queries = []

    regexSQL = r"(?s)SELECT.*?;"

    queries.extend(re.findall(regexSQL, data, re.IGNORECASE))

    queries = list(queries)

    for idx, query in enumerate(queries, start=1):
        tables = []
        query = re.sub(r'\s+', ' ', query)
        query = query.strip()
        regexFROM = r"\bFROM\s+(\w+\.\w+|\w+)\b"
        regexJOIN = r"\bJOIN\s+(\w+(?:\.\w+)?)(?:\s+|\n|$)"
        regexFROM2 = r'#\w+\.\$?\w+#\.\w+'
        regexFROM3 = r'#\S+#\.\S+#'
        tables.extend(re.findall(regexFROM, query, re.IGNORECASE))
        tables.extend(re.findall(regexJOIN, query, re.IGNORECASE))
        tables.extend(re.findall(regexFROM2, query, re.IGNORECASE))
        tables.extend(re.findall(regexFROM3, query, re.IGNORECASE))
        tables = ", ".join(list(set(tables)))
        result["table"].append({"id": idx, "query": query, "tables": tables})

    return result
