import datetime


def get_date_range(date_time):
    # 获取某一天的时间范围
    start_time = date_time + ' 00:00:00'
    end_time = date_time + ' 23:59:59'
    return datetime.datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S"), datetime.datetime.strptime(end_time,
                                                                                                   "%Y-%m-%d %H:%M:%S")
