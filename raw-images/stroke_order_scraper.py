import urllib3
import urllib

from time import sleep
http = urllib3.PoolManager()


list = ['你' ,'哈', '不' ,'可']
for x in list:
    hanzi= x
    print(x)

    hanzi_parsed = urllib.parse.quote(hanzi)
    url = 'http://localhost:8000/raw-images/stroke_order/'+ hanzi_parsed+'-bw.png'
    # url = 'http://www.handedict.de/zi/images/stroke_order/'+ hanzi_parsed+'-bw.png'

    sleep(1)


    print(url)


    r = http.request('get',url)
    print (r.status)
    f = open( 'downloaded/'+hanzi+'-bw.png', 'wb')
    f.write(r.data)

