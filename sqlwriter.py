"""
:Insert statement is:

INSERT INTO events ( name, description, date, link1, linkdesc1, link2, linkdesc2, link3, linkdesc3 )
( name, description, date, link1, ...)

Program reads from a csv file, and then writes an insert statement to a .txt file that can copy and pasted into mysql terminal
"""

import sys
import csv


if len(sys.argv) != 2:
    print("ERROR: called incorrectly. Run this script with: python sqlwriter.py yourcsvfile.xml")

else:
    with open(sys.argv[1], mode ='r') as f1:
        csvFile = csv.reader(f1)
        #length = len(list(csvFile))
        with open('query.txt', 'w') as f2:
            f2.write("DELETE FROM events; INSERT INTO events ( name, description, date, link1, linkdesc1, image_url) VALUES\n")
            row = 0
            for item in csvFile:
                imgurl = "/home/henyjj/Desktop/WGSS%20Website/images/" + str(item[5])
                if row != 0:
                    f2.write(f'( "{item[0]}", "{item[1]}", "{item[2]}", "{item[3]}", "{item[4]}", "{imgurl}"),\n')
                    """
                    elif item[7] == "":
                        f2.write(f'( "{item[0]}", "{item[1]}", {item[2]}, "{item[3]}", "{item[4]}", "{item[5]}", "{item[6]}" ),\n')
                    elif item[7] != "":
                        f2.write(f'( "{item[0]}", "{item[1]}", "{item[2]}", "{item[3]}", "{item[4]}", "{item[5]}", "{item[6]}", "{item[7]}", "{item[8]}"),\n')

                    """

                row += 1

