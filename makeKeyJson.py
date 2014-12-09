import csv

csv.reader('keyboard_map.csv')


with open('keyboard_map.csv', 'r') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in spamreader:
        # row = ['"'+x+'"' for x in row if x not in ' ']
        try:
            k, *values = row

            print (k, ':',values)
        except ValueError as e:
            pass

        # print (', '.join(row))
# with open('out.js','w') as out_file:
#     with open('keyboard_map.csv','r') as file:
#         for line in file:
#             if (line[0]!=','):
#
#                 print([x for x in line if x not in [',',' ','\n']] )
#                 out_file.write(line)