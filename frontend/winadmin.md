# winadmin

## 简介

[winadmin ](https://gitee.com/zanwin/winadmin)基于Python3.8.x + Django4.2.x + DRF3.14.x + Vue3.x + TypeScript + Vite + Element Plus的企业级通用后台管理系统，希望减少工作量，帮助大家实现快速开发。代码毫无保留给个人及企业免费使用。

- 🧑‍🤝‍🧑前端采用[Vue-Next-Admin](https://gitee.com/lyt-top/vue-next-admin)、[Vue](https://gitee.com/link?target=https%3A%2F%2Fcn.vuejs.org%2F)、[Element Plus](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Felement-plus%2Felement-plus)。
- 👭后端采用 Python 语言 Django 框架以及强大的 [Django REST Framework](https://gitee.com/link?target=https%3A%2F%2Fpypi.org%2Fproject%2Fdjangorestframework)。
- 👫权限认证使用[Django REST Framework SimpleJWT](https://gitee.com/link?target=https%3A%2F%2Fpypi.org%2Fproject%2Fdjangorestframework-simplejwt)，支持多终端认证系统。
- 👬支持加载动态权限菜单，多方式轻松权限控制。
- 💏特别鸣谢：[Vue-Next-Admin](https://gitee.com/lyt-top/vue-next-admin)

## 菜单配置

- 前端控制：[/@/router/route.ts](https://e.gitee.com/zanwin/repos/zanwin/winadmin/blob/frontend_yxz/frontend/src/router/route.ts) 修改菜单数据

- 后端控制：需先去 [/src/stores/themeConfig.ts](https://e.gitee.com/zanwin/repos/zanwin/winadmin/blob/frontend_yxz/frontend/src/stores/themeConfig.ts#L133) 下开启 `isRequestRoutes: true`，然后去 [/@/api/menu/index.ts](https://e.gitee.com/zanwin/repos/zanwin/winadmin/blob/frontend_yxz/frontend/src/api/menu/index.ts) 中修改接口拿菜单数据

  (*默认使用后端控制路由*)

### 新建文件

- `/@/views` 下新增文件

![image-20230920094731257](C:\Users\小咖\AppData\Roaming\Typora\typora-user-images\image-20230920094731257.png)

### 系统配置

- 在winadmin菜单管理下新增
- 

![image-20230920094603745](C:\Users\小咖\AppData\Roaming\Typora\typora-user-images\image-20230920094603745.png)

- 新增节点（增、删、改、查）

![image-20230919163314447](C:\Users\小咖\AppData\Roaming\Typora\typora-user-images\image-20230919163314447.png)



### 权限分配

- 查看用户角色

![image-20230919155404563](C:\Users\小咖\AppData\Roaming\Typora\typora-user-images\image-20230919155404563.png)

- 用户对应角色分配菜单权限

![image-20230919155853239](C:\Users\小咖\AppData\Roaming\Typora\typora-user-images\image-20230919155853239.png)



## 组件使用

### 组件引用

```ts
// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/components/search/index.vue'));
const FunctionButton = defineAsyncComponent(() => import('/@/components/button/index.vue'));
```



### 组件配置

- 在对应的`/mock.ts` 文件进行配置

#### table

```ts
// 表单数据选项(自行扩展)
export const tableData = {
	// 列表数据（必传）
	data: [],
	// 表头内容（必传，注意格式）
	header: [
		{ key: 'id', colWidth: '', align: 'center', title: 'ID', type: 'text', isCheck: true },
		{ key: 'name', colWidth: '', align: 'center', title: '岗位名称', type: 'text', isCheck: true },
		{ key: 'code', colWidth: '', align: 'center', title: '岗位编码', type: 'text', isCheck: true },
		{ key: 'status', colWidth: '', align: 'center', title: '状态', type: 'text', isCheck: true, slot: 'statusSlot' },
		{ key: 'creator', colWidth: '', align: 'center', title: '创建者', type: 'text', isCheck: true },
		{ key: 'updater', colWidth: '', align: 'center', title: '更新者', type: 'text', isCheck: true },
		{ key: 'sort', colWidth: '', align: 'center', title: '排序', type: 'text', isCheck: true },
		{ key: 'created_at', colWidth: '180', align: 'center', title: '创建时间', type: 'text', isCheck: true },
		{ key: 'updated_at', colWidth: '180', align: 'center', title: '修改时间', type: 'text', isCheck: true },
		{ key: 'remark', colWidth: '', align: 'center', title: '备注', type: 'text', isCheck: true },
		{ key: 'operate', colWidth: '180', align: 'center', title: '操作', type: 'text', isCheck: true, fixed:'right', slot: 'operateSlot' },
	],
	// 配置项（必传）
	config: {
		total: 0, // 列表总数
		loading: true, // loading 加载
		isBorder: true, // 是否显示表格边框
		isSerialNo: false, // 是否显示表格序号
		isSelection: false, // 是否显示表格多选
		isOperate: false, // 是否显示表格操作栏
		isPage: true, // 是否显示分页
		isSetup:true,// 是否显示设置
	},
	// 分页参数
	param: {
		page: 1,
		page_size: 10,
	},
	// 打印标题
	printName: 'winadmin 表格打印演示',
};
```

#### form

- form表单配置

```ts
// 表单数据选项(自行扩展)
export const formModels = [
	{
		label: '权限标识',// lable
		key: 'name',// key
		type: 'input',// 输入框类型
		rule: true,// 是否必填
		isrow:false,// 是否整行
        disabled: false,// 是否禁用
        pattern: /[a-zA-z]$/,// 自定义正则校验
		message:'角色标识应为英文字符',// 自定义正则校验错误信息
        validator:(rule:any,value:any, callback:any) =>{ //自定义校验
			if (/[a-zA-z]$/.test(value) == false) {
			  callback(new Error('角色标识只能是英文字符'));
			} else {
			  callback();
			}
		  }
	},
	{
		label: '上级菜单',// lable
		key: 'pid',// key
		type: 'cascader',// 输入框类型
		rule: true,// 是否必填
		isrow:false,// 是否整行
        disabled: false,// 是否禁用
		props: {				// 控件配置(用于联级单选)
			checkStrictly: true,
			emitPath: false,
			value: 'id',
			label: 'name',
			children: 'children'
		},
		options: [] // 数据
	},
]
```

- 输入框type类型

![image-20230919175932764](C:\Users\小咖\AppData\Roaming\Typora\typora-user-images\image-20230919175932764.png)



#### search

- search表单配置

  ```ts
  // 搜索表单
  export const searchData = {
  	// 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
  	search: [
  		{
              label: '名称',// label
              prop: 'name',// 字段key
              placeholder: '请输入名称',// 自定义提示
              required: false,// 是否必填
              type: 'input'// 输入框类型
          }, {
              label: '编码',
              prop: 'code',
              placeholder: '请输入编码',
              required: false,
              type: 'input'
          },
  	],
  };
  ```

#### button

- button表单配置

```ts
// 按钮
export const buttonData = {
	// 配置项（必传）
	config: {
        isadd: true, //新增按钮
		isaddDisabled:true,
		isimport:false, //导出按钮
		isimportDisabled:false,
		isexport:false, //上传按钮
		isexportDisabled:false,
	},
}
```

