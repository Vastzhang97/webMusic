#!/usr/bin/python3
import pymysql

playlist_id = 0
play_list_cover = '1'
play_list_name = '1'
collect_num = 0
forwarding_num = 0
comment_num = 0
label = '1'
introduce = '1'

song_id = 0
song_src = ''
song_name = ''
during = ''
singer_name = ''
album_name = ''
# 打开数据库连接
db = pymysql.connect("111.230.244.113", "root", "10001000", "music")

# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
# # 使用 fetchone() 方法获取单条数据.
# data = cursor.fetchone()
sql1 = "INSERT INTO `music`.`album` (`aId`, `aImgSrc`, `aTitle`, `aCollectNum`, `aFowardingNum`, `aCommentNum`, `aTags`, `aIntroduce`, `aPlayNum`) " \
       "VALUES (" + str(playlist_id) + ", " + play_list_cover + ", " + play_list_name + ", " + str(collect_num) + ", " \
                                                                                                                  "" + str(
    forwarding_num) + ", " + str(comment_num) + ", " + label + ", " + introduce + ", NULL);"
sql2 = "INSERT INTO `music`.`musicinfo` (`mId`, `musicSrc`, `mTitle`, `mAlbum`, `mSinger`, `mLyrics`, `mDuring`, `mCompose`, `mPlaylistId`) VALUES " \
       "(" + str(
    song_id) + ", " + song_src + ", " + song_name + ", " + play_list_name + ", " + singer_name + ", NULL, " + during + ", NULL, " + playlist_id + ");"
user_id = 0
user_name = ''
user_head = ''
sql3 = "INSERT INTO `music`.`user` (`uId`, `uName`, `password`, `status`, `headImg`) VALUES (" + str(
    user_id) + ", " + user_name + ", NULL, NULL, " + user_head + ");"
comment = ''
comment_date = ''
like_num = 0
sql4 = "INSERT INTO `music`.`comment` (`cId`, `cUName`, `cContent`, `cDate`, `cUHeadImg`, `cReplyId`, `mId`,`cLikeNum`) VALUES " \
       "(NULL, " + user_name + ", " + comment + ", " + comment_date + ", " + user_head + ", NULL, NULL," + str(
    like_num) + ");"
try:
    # 执行sql语句
    cursor.execute(sql1)
    # 提交到数据库执行
    db.commit()
except Exception as e:
    db.rollback()
    print(e)
finally:
    # 关闭数据库连接
    db.close()
