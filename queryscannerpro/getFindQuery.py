import re


def extQuery(data):

    result = {"table": []}
    queries = []

    regexSQL = r"(?s)SELECT.*?;"

    queries.extend(re.findall(regexSQL, data, re.IGNORECASE))

    queries = list(queries)

    for idx, query in enumerate(queries, start=1):
        tables = set()
        try:

            query = re.sub(r'(\w+)\s+\w+,', r'\1,', query)
            query = re.sub(r'\s+', ' ', query).upper()
            query = query.strip()
            regexFROM = r"\bFROM\s+(\w+\.\w+|\w+)\b"
            regexJOIN = r"\bJOIN\s+(\w+(?:\.\w+)?)(?:\s+|\n|$)"
            regexFROM2 = r'#\w+\.\$?\w+#\.\w+'
            regexFROM3 = r'#\S+#\.\S+#'
            regexFROM4 = r"(?<=FROM\s)((?:\w+\.\w+(?:\s*,\s*)?)+)(?=.*?\bWHERE\b)"
            tables.update(re.findall(regexFROM, query, re.IGNORECASE))
            tables.update(re.findall(regexJOIN, query, re.IGNORECASE))
            tables.update(re.findall(regexFROM2, query, re.IGNORECASE))
            tables.update(re.findall(regexFROM3, query, re.IGNORECASE))
            tables.update(re.findall(regexFROM4, query, re.IGNORECASE))
            tables = ", ".join(tables)
            tables = list(set(map(str.strip, tables.split(','))))
            tables = ", ".join(tables)

        except:
            print('error')

        result["table"].append({"id": idx, "query": query, "tables": tables})

    return result
