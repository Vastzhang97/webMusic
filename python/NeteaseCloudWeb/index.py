from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
import time
import pymysql
from modules import Util
from modules import Logger

url = 'https://music.163.com/'
logger = Logger.Logger(__file__)
util = Util.Util()


def run(url):
    db = pymysql.connect("111.230.244.113", "root", "10001000", "music")
    cursor = db.cursor()
    try:
        driver = webdriver.Chrome()
        driver.implicitly_wait(10)
        driver.get(url)
        driver.maximize_window()
        time.sleep(5)
        hand = driver.find_element_by_xpath("//div[@class='hand']")
        ActionChains(driver).move_to_element(hand).perform()
        time.sleep(0.5)
        driver.execute_script('document.getElementsByClassName("left f-fl")[0].children[0].click()')
        current_handle = driver.current_window_handle
        hot_iframe = driver.find_element_by_xpath("//iframe[@id='g_iframe']")
        driver.switch_to.frame(hot_iframe)
        # 处理首页歌单
        index_hot = driver.find_elements_by_xpath(
            "//div[@id='discover-module']//ul[@class='m-cvrlst f-cb']/li/div[@class='u-cover u-cover-1']")
        index_hot_num = sum(1 for e in index_hot)
        x1 = 0
        driver.switch_to.default_content()
        while x1 < index_hot_num:
            time.sleep(5)
            driver.switch_to.frame(hot_iframe)
            index_hot = driver.find_elements_by_xpath(
                "//div[@id='discover-module']//ul[@class='m-cvrlst f-cb']/li/div[@class='u-cover u-cover-1']")
            if util.check_content('<i class="u-icn u-icn-5p3"></i>', index_hot) is not None:
                x1 += 1
                continue
            index_hot_a = driver.find_elements_by_xpath(
                "//div[@id='discover-module']//ul[@class='m-cvrlst f-cb']/li/div[@class='u-cover u-cover-1']/a")
            string2 = index_hot_a[x1].get_attribute("outerHTML").split("?")[1]
            playlist_id = string2[string2.find("=") + 1:string2.find('"')]
            print(util.get_current_time(), "点击hot_a[x1]: ", index_hot_a[x1].get_attribute("outerHTML"))
            logger.info_str("点击歌单: ", index_hot_a[x1].get_attribute("outerHTML"))
            index_hot_a[x1].click()
            driver.switch_to.default_content()
            time.sleep(5)
            util.switch_to_new_window(driver, current_handle)
            time.sleep(1)
            album_iframe = driver.find_element_by_xpath('//iframe[@name="contentFrame"]')
            driver.switch_to.frame(album_iframe)
            cover = driver.find_element_by_xpath("//img[@class='j-img']").get_attribute("outerHTML")
            play_list_cover = cover.split('"')[1]
            title = driver.find_element_by_xpath("//h2[@class='f-ff2 f-brk']")
            play_list_name = title.get_attribute("innerHTML")
            num_i = driver.find_elements_by_xpath("//div[@id='content-operation']//i")
            collect_num = util.get_num_in_str(num_i[1].get_attribute("innerHTML"))
            forwarding_num = util.get_num_in_str(num_i[2].get_attribute("innerHTML"))
            comment_num = util.get_num_in_str(num_i[4].get_attribute("innerHTML"))
            tags = driver.find_elements_by_xpath("//div[@class='tags f-cb']//i")
            label = ""
            for index6, item6 in enumerate(tags):
                label += item6.get_attribute("innerHTML") + " "
            introduce = driver.find_element_by_xpath("//p[@id='album-desc-more']").get_attribute("innerHTML")
            sql1 = "INSERT INTO `music`.`album` (`aId`, `aImgSrc`, `aTitle`, `aCollectNum`, `aFowardingNum`, `aCommentNum`, `aTags`, `aIntroduce`, `aPlayNum`) " \
                   "VALUES ('" + str(playlist_id) + "', '" + play_list_cover + "', '" + play_list_name + "', '" + str(
                collect_num) + "', '" \
                               "" + str(forwarding_num) + "', '" + str(
                comment_num) + "', '" + label + "', '" + introduce + "', NULL);"
            try:
                cursor.execute(sql1)
                db.commit()
            except Exception as e:
                db.rollback()
                logger.warning(e)
                print(e)
            # 处理歌单内容
            songs_a = driver.find_elements_by_xpath("//table[@class='m-table ']//tr/td[2]//a")
            total_songs_num = sum(1 for e in songs_a)
            x4 = 0
            while x4 < total_songs_num:
                string1 = songs_a[x4].get_attribute("outerHTML").split("?")[1]
                song_id = string1[string1.find("=") + 1:string1.find('">')]
                song_src = util.cut_between_str(songs_a[x4].get_attribute("outerHTML"), '"', '">')
                songs_name = driver.find_elements_by_xpath("//table[@class='m-table ']//b")
                song_name = util.cut_between_str(songs_name[x4].get_attribute("outerHTML"), '"', '">')
                songs_during = driver.find_elements_by_xpath("//table[@class='m-table ']//span[@class='u-dur ']")
                during = songs_during[x4].get_attribute("textContent")
                singer_names = driver.find_elements_by_xpath("//table[@class='m-table ']//tr/td[4]//span")
                singer_name = util.cut_between_str(singer_names[x4].get_attribute("outerHTML"), '"', '">')
                songs_album = driver.find_elements_by_xpath("//table[@class='m-table ']//tr/td[5]//a")
                album_name = songs_album[x4].get_attribute("outerHTML").split('"')[3]
                x4 += 1
                sql2 = "INSERT INTO `music`.`musicinfo` (`mId`, `musicSrc`, `mTitle`, `mAlbum`, `mSinger`, `mLyrics`, `mDuring`, `mCompose`, `mPlaylistId`) VALUES " \
                       "('" + str(
                    song_id) + "', '" + song_src + "', '" + song_name + "', '" + album_name + "', '" + singer_name + "', NULL, '" + during + "', NULL, '" + str(
                    playlist_id) + "');"
                try:
                    cursor.execute(sql2)
                    db.commit()
                except Exception as e:
                    db.rollback()
                    logger.warning(e)
                    print(e)

            # 处理歌单内歌曲内容
            x2 = 0
            while x2 < total_songs_num:
                time.sleep(5)
                driver.switch_to.default_content()
                driver.execute_script(
                    "var ifm = document.getElementById('g_iframe').contentWindow.document.documentElement;"
                    "ifm.scrollTop = ifm.scrollHeight - ifm.clientHeight;")
                time.sleep(1)
                content_iframe = driver.find_element_by_xpath('//iframe[@name="contentFrame"]')
                driver.switch_to.frame(content_iframe)
                songs_a = driver.find_elements_by_xpath("//table[@class='m-table ']//tr/td[2]//a")
                print(util.get_current_time(), "点击歌曲", songs_a[x2].get_attribute("outerHTML"))
                logger.info_str("点击歌曲", songs_a[x2].get_attribute("outerHTML"))
                driver.execute_script('document.getElementsByClassName("txt")[' + str(x2) + '].children[0].click()')
                # songs_a[x2].click()
                time.sleep(5)
                hot_comments = driver.find_elements_by_xpath("//div[@class='cmmts j-flag']")
                total_comment_num = sum(1 for e in hot_comments)
                x3 = 0
                while x3 < total_comment_num:
                    user_heads = driver.find_elements_by_xpath("//div[@class='cmmts j-flag']//img")
                    user_head = util.cut_between_str(user_heads[x3].get_attribute("outerHTML"), '"', '">')
                    user_names = driver.find_elements_by_xpath("//div[@class='cnt f-brk']//a")
                    user_name = user_names[x3].get_attribute("textContent")
                    string1 = user_names[x3].get_attribute("outerHTML").split('?')[1]
                    user_id = string1[string1.find("=") + 1:string1.find('"')]
                    comments = driver.find_elements_by_xpath("//div[@class='cnt f-brk']")
                    comment_html = comments[x3].get_attribute("textContent")
                    index1 = comment_html.find('：') + 1
                    comment = comment_html[index1:]
                    comment_dates = driver.find_elements_by_xpath("//div[@class='time s-fc4']")
                    comment_date = comment_dates[x3].get_attribute("textContent")
                    like_nums = driver.find_elements_by_xpath("//div[@class='rp']//a[1]")
                    like_num = util.get_num_in_str(like_nums[x3].get_attribute("textContent"))
                    x3 += 1
                    sql3 = "INSERT INTO `music`.`user` (`uId`, `uName`, `password`, `status`, `headImg`) VALUES ('" + str(
                        user_id) + "', '" + user_name + "', NULL, NULL, '" + user_head + "');"
                    try:
                        cursor.execute(sql3)
                        db.commit()
                    except Exception as e:
                        db.rollback()
                        logger.warning(e)
                        print(e)
                    sql4 = "INSERT INTO `music`.`comment` (`cId`, `cUName`, `cContent`, `cDate`, `cUHeadImg`, `cReplyId`, `mId`,`cLikeNum`) VALUES " \
                           "(NULL, '" + user_name + "', '" + comment + "', '" + comment_date + "', '" + user_head + "', NULL, NULL,'" + str(
                        like_num) + "');"
                    try:
                        cursor.execute(sql4)
                        db.commit()
                    except Exception as e:
                        db.rollback()
                        logger.warning(e)
                        print(e)
                driver.switch_to.default_content()
                driver.back()
                x2 += 1

            driver.switch_to.default_content()
            driver.back()
            x1 += 1
    finally:
        db.close()
        driver.quit()


run(url)
