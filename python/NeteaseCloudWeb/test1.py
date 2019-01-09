from modules import Util

util = Util.Util()
string = '<a href="/user/home?id=248117806" class="s-fc7">MaRInooe</a>'
string1 = string.split('?')[1]
id = string1[string1.find("=") + 1:string1.find('"')]

songs_id = []
songs_id.append('1')
songs_id.append('2')
for index, item in enumerate(songs_id):
    print(index, item)
