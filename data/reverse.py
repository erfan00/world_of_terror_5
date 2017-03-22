import csv
import operator

content = []

print('Reading CSV file...')
with open('output_new_2_reverse.csv', 'rU') as csvfile:
    csvreader = csv.reader(csvfile, dialect=csv.excel_tab, delimiter=',', quotechar='\"')
    for row in csvreader:
        content.append(row)
print('OK!')

# # Now content is a list of this form:
# # [[a, b, c], [d, e, f], [x, y, z]].

# # So if you want the i-th row, you need content[i].
# # Note that the first row (i = 0) is the atrributes.
# print eval(content[3293][13])
# print len(content), len(content[0])

f = open('output_new_2_reverse_w.csv', 'w')

for i in range(0, len(content)):
    for j in range(len(content[i]) - 1, 0, -1):
        f.write('%s,' % content[i][j])
    f.write('%s\n' % content[i][0])

f.close()
