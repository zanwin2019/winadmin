from ua_parser.user_agent_parser import Parse


def parser_user_agent(user_agent):
    # 解析user_agent
    parsed_user_agent = Parse(user_agent)
    browser = parsed_user_agent.get('user_agent')
    # 浏览器
    browser_str = browser.get('family') if browser and browser.get('family') else ''
    # 操作系统
    os = parsed_user_agent.get('os')
    os_str = os.get('family') if os and os.get('family') else ''
    return browser_str, os_str, parsed_user_agent