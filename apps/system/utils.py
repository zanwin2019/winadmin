# -*- coding: utf-8 -*-
import os
import json
from pkg.common.log import logger
from django.conf import settings


def get_jsonfile_content(path):
    """
    获取json文件内容；如果path为文件夹，返回数据为路径下所有json文件内容list
    @param path {str} json文件路径
    @return list
    """
    if not path:
        return []
    data = []
    if os.path.isfile(path):
        if not path.endswith(".json"):
            return data
        try:
            with open(path, "r") as load_f:
                load_dict = json.load(load_f)
            if isinstance(load_dict, dict):
                load_dict = [load_dict]
            data = load_dict
        except Exception as e:
            logger.error(f"获取{path}失败！error: {str(e)}")
        return data

    dir_or_files = os.listdir(path)
    for dir_file in dir_or_files:
        # 获取目录或者文件的路径
        dir_file_path = os.path.join(path, dir_file)
        data += get_jsonfile_content(dir_file_path)
    return data


def fill_tree_route(pure_tree, pre_routes=[]):
    """add routes for tree item"""

    # print pre_routes, '->', pure_tree['name']
    pure_tree['route'] = pre_routes

    for child in pure_tree.get('children', []):
        fill_tree_route(child, pre_routes + [{'id': pure_tree['id'], 'name': pure_tree['name']}])


def get_json_data(file_path):

    if not os.path.exists(file_path):
        logger.error(f"初始化失败！error: {file_path} 路径不存在！")
        return
    if os.path.isfile(file_path) and not file_path.endswith(".json"):
        logger.error("初始化失败！error: 文件格式非json！")
        return
    data = get_jsonfile_content(file_path)
    return data
