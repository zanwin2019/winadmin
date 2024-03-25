<template>
	<div class="home-container layout-pd">
		<el-row :gutter="15" class="home-card-one mb15">
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(v, k) in state.mainData" :key="k"
				:class="{ 'home-media home-media-lg': k > 1, 'home-media-sm': k === 1 }">
				<div class="home-card-item flex">
					<div class="flex-margin flex w100" :class="` home-one-animation${k}`">
						<div class="flex-auto">
							<span class="font30">{{ v.count }}</span>
							<span class="ml5 font16" style="color: #ff6462" v-if="v.rate>0">{{ v.rate }}%</span>
							<span class="ml5 font16" style="color: #6660f9" v-if="v.rate<0">{{ v.rate }}%</span>
							<div class="mt10">{{ v.name }}</div>
						</div>
						<div class="home-card-item-icon flex" :style="{ background: `var(${v.backgroundColor})` }">
							<i class="flex-margin font32" :class="v.icon"
								:style="{ color: `var(${v.color})` }"></i>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-row :gutter="15" class="home-card-two mb15">
			<el-col :xs="24" :sm="14" :md="14" :lg="18" :xl="18">
				<div class="home-card-item" style="display: flex;">
					<div style="height: 100%;width: 70%;" ref="homeMapRef"></div>
					<div style="height: 100%;width: 30%;" ref="homeLineRef"></div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="10" :md="10" :lg="6" :xl="6" class="home-media">
				<div class="home-card-item2">
					<div style="height: 100%" ref="homeParRef"></div>
				</div>
				<div class="home-card-item3">
					<div style="height: 100%" ref="homePieRef"></div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="home">
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import * as echarts from 'echarts';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import chinaJSON from './china.json'
import { useHomeApi } from '/@/api/home/index';

// 定义变量内容
const homeLineRef = ref();
const homeMapRef = ref();
const homeParRef = ref();
const homePieRef = ref();
const storesTagsViewRoutes = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const state = reactive({
	mainData:[],




	global: {
		homeChartOne: null,
		homeChartTwo: null,
		homeCharThree: null,
		homeChartFour: null,
		dispose: [null, '', undefined],
	} as any,
	homeOne: [
		{
			num1: '125,12',
			num2: '-12.32',
			num3: '总访问人数',
			num4: 'fa fa-meetup',
			color1: '#FF6462',
			color2: '--next-color-primary-lighter',
			color3: '--el-color-primary',
		},
		{
			num1: '653,33',
			num2: '+42.32',
			num3: '点击量（近30天）',
			num4: 'iconfont icon-ditu',
			color1: '#6690F9',
			color2: '--next-color-success-lighter',
			color3: '--el-color-success',
		},
		{
			num1: '125,65',
			num2: '+17.32',
			num3: '点击量（近7天）',
			num4: 'iconfont icon-zaosheng',
			color1: '#6690F9',
			color2: '--next-color-warning-lighter',
			color3: '--el-color-warning',
		},
		{
			num1: '520,43',
			num2: '-10.01',
			num3: '点击量（当天）',
			num4: 'fa fa-github-alt',
			color1: '#FF6462',
			color2: '--next-color-danger-lighter',
			color3: '--el-color-danger',
		},
	],
	dataList: [
		{ name: '澳门', value: 18 },
		{ name: '香港', value: 273 },
		{ name: '台湾', value: 153 },
		{ name: '新疆', value: 76 },
		{ name: '宁夏', value: 75 },
		{ name: '青海', value: 18 },
		{ name: '甘肃', value: 134 },
		{ name: '陕西', value: 248 },
		{ name: '西藏', value: 1 },
		{ name: '云南', value: 176 },
		{ name: '贵州', value: 146 },
		{ name: '四川', value: 543 },
		{ name: '重庆', value: 576 },
		{ name: '海南', value: 168 },
		{ name: '广西', value: 254 },
		{ name: '广东', value: 1407 },
		{ name: '湖南', value: 1018 },
		{ name: '湖北', value: 67800 },
		{ name: '河南', value: 1273 },
		{ name: '山东', value: 765 },
		{ name: '江西', value: 936 },
		{ name: '福建', value: 307 },
		{ name: '安徽', value: 990 },
		{ name: '浙江', value: 1237 },
		{ name: '江苏', value: 633 },
		{ name: '上海', value: 394 },
		{ name: '黑龙江省', value: 484 },
		{ name: '吉林', value: 93 },
		{ name: '辽宁', value: 126 },
		{ name: '内蒙古', value: 75 },
		{ name: '山西', value: 133 },
		{ name: '河北', value: 319 },
		{ name: '天津', value: 137 },
		{ name: '北京', value: 512 }
	],
	myCharts: [] as EmptyArrayType,
	charts: {
		theme: '',
		bgColor: '',
		color: '#303133',
	},
});

// 排名
const initLineChart = (data:any) => {
	let arr1 = []
    let arr2 = []
      for (let i = 0; i < data.length; i++) {
        arr1.push(data[i].name)
        arr2.push(data[i].value)
      }
	//   console.log('==>>arr1',arr1)
	if (!state.global.dispose.some((b: any) => b === state.global.homeChartOne)) state.global.homeChartOne.dispose();
	state.global.homeChartOne = markRaw(echarts.init(homeLineRef.value, state.charts.theme));
	// var data = [9, 99, 399, 499, 599, 699, 799, 899, 999, 1999, 2999, 3999, 4999, 5999, 6999, 7999, 8999, 9999,]
	const option = {
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			top:'5%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			show: false,
			width: '10px'
		},
		yAxis: {
			type: 'category',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			// data: ['北京', '上海', '天津', '河南', '河北', '湖南', '湖北', '天津', '河南', '河北', '湖南', '湖北', '天津', '河南', '河北', '湖南', '郑州']
			data:arr1
		},
		series: [
			{
				name: 'Direct',
				type: 'bar',
				stack: 'total',
				label: {
					show: false,
					position: 'right'
				},
				emphasis: {
					focus: 'series'
				},
				barWidth: 10,
				data: data,
				itemStyle: {
					normal: {
						color: function (params: any) {
							// 根据数值区间返回颜色
							if (params.data >= 0 && params.data < 10) {
								return '#BEDAEE';
							} else if (params.data >= 10 && params.data < 100) {
								return '#ffd768';
							} else if (params.data >= 100 && params.data < 1000) {
								return '#ff8c71';
							} else if (params.data >= 1000 && params.data < 10000) {
								return '#ff5428';
							} else {
								return '#7f1100';
							}
						}
					},
				},
			}
		]
	};
	state.global.homeChartOne.setOption(option);
	state.myCharts.push(state.global.homeChartOne);
};

// 地图echarts柱状图根据数值区间显示不同的颜色
const initMapChart = (data:any) => {
	var myChart = echarts.init(homeMapRef.value)
	echarts.registerMap('china', chinaJSON) //注册可用的地图
	const option = {
		// backgroundColor: state.charts.bgColor,
		title: {
			text: '用户分布',
			x: 'left',
			textStyle: { fontSize: '15', },
		},
		grid: { top: 70, right: 20, bottom: 30, left: 30 },
		tooltip: {
			// triggerOn: "hover",
			formatter: function (e, t, n) {
				return '.5' == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
			}
		},
		visualMap: {
			min: 0,
			max: 100000,
			left: 26,
			bottom: 40,
			showLabel: true,
			text: ["高", "低"],
			pieces: [{
				gt: 10000,
				label: "> 10000人",
				color: "#7f1100"
			}, {
				gte: 1000,
				lte: 10000,
				label: "1000 - 10000人",
				color: "#ff5428"
			}, {
				gte: 100,
				lt: 1000,
				label: "100 - 1000人",
				color: "#ff8c71"
			}, {
				gte: 10,
				lt: 100,
				label: "10 - 100人",
				color: "#ffd768"
			}, {
				gte: 1,
				lt: 10,
				label: "1 - 10人",
				color: "#BEDAEE"
			}],
			show: true
		},
		geo: {
			map: "china",
			roam: true,
			scaleLimit: {
				min: 1,
				max: 2
			},
			zoom: 1.13,
			top: 50,
			label: {
				show: true,
				fontSize: "14",
				color: "rgba(0,0,0,0.7)"
			},
			itemStyle: {
				borderColor: "rgba(0, 0, 0, 0.2)"
			},
			emphasis: {
				areaColor: "#f2d5ad",
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				borderWidth: 0
			}
		},
		series: [{
			name: "用户人数",
			type: "map",
			geoIndex: 0,
			data: data
		}]
	};
	myChart.setOption(option)
}

// 饼图par
const initParChart = (data:any) => {
	console.log('==>>111',data)
	let arr1 = []
    let arr2 = []
      for (let i = 0; i < data.length; i++) {
        arr1.push(data[i].name)
        arr2.push(data[i].value)
      }
	if (!state.global.dispose.some((b: any) => b === state.global.homeChartTwo)) state.global.homeChartTwo.dispose();
	state.global.homeChartTwo = markRaw(echarts.init(homeParRef.value, state.charts.theme));
	
	const colorList = ['#ff8c71', '#FFDCDC', '#FEC279', '#968AF5', '#E790E8', '#E730E6'];
	const option = {
		backgroundColor: state.charts.bgColor,
		title: {
			text: '浏览器分布',
			x: 'left',
			textStyle: { fontSize: '15', color: state.charts.color },
		},
		tooltip: { trigger: 'item', formatter: '{b} <br/> {c}' },
		legend: {
			type: 'scroll',
			orient: 'vertical',
			right: '5%',
			// left: '65%',
			top: '30%',
			itemWidth: 14,
			itemHeight: 14,
			data: arr1,
			textStyle: {
				rich: {
					name: {
						fontSize: 14,
						fontWeight: 400,
						width: 200,
						height: 35,
						padding: [0, 0, 0, 60],
						color: state.charts.color,
					},
					rate: {
						fontSize: 15,
						fontWeight: 500,
						height: 35,
						width: 40,
						padding: [0, 0, 0, 30],
						color: state.charts.color,
					},
				},
			},
		},
		series: [
			{
				type: 'pie',
				// radius: ['40','80'],
				center: ['35%', '58%'],
				itemStyle: {
					color: function (params: any) {
						return colorList[params.dataIndex];
					},
				},
				label: { show: false },
				labelLine: { show: false },
				data: data,
			},
		],
	};
	state.global.homeChartTwo.setOption(option);
	state.myCharts.push(state.global.homeChartTwo);
};

// 饼图par
const initPieChart = (data:any) => {
	if (!state.global.dispose.some((b: any) => b === state.global.homeChartFour)) state.global.homeChartFour.dispose();
	state.global.homeChartFour = markRaw(echarts.init(homePieRef.value, state.charts.theme));
	// const dataList = [
	// 	{
	// 		name: '数据1',
	// 		value: 33
	// 	},
	// 	{
	// 		name: '数据2',
	// 		value: 44
	// 	},
	// 	{
	// 		name: '数据3',
	// 		value: 55
	// 	},
	// 	{
	// 		name: '数据4',
	// 		value: 70
	// 	},
	// 	{
	// 		name: '数据5',
	// 		value: 99
	// 	}
	// ];
	// const colorList = [
	// 	// "#FF8F8F",
	// 	// "#FF9D83",
	// 	// "#FFBC80",
	// 	// "#FFEC9C",
	// 	// "#E5FF9C",
	// 	// "#A9FFA9",
	// 	// "#8AF9C3",
	// 	// "#99FFF3",
	// 	// "#82F9F6",
	// 	// "#80EDFF",
	// 	// "#79D9F7",
	// 	"#7AC2F9",
	// 	"#A4A4FE",
	// 	"#B8B8FF",
	// 	"#CDB3FF",
	// 	"#FFB3F4",
	// 	"#FFA9D4",
	// 	"#FFBOBO",
	// 	"#FFBCA4",
	// 	"#FFD6A9",
	// 	"#FFF3C0",
	// 	"#E9FFC2",
	// 	"#COFFC6",
	// 	"#AAF7D6",
	// 	"#ABFFF9",
	// 	"#A0F5F9",
	// 	"#A1E9FF",
	// 	"#9ADBFC",
	// 	"#9BC8F9",
	// 	"#B3B3FF",
	// 	"#C2C2FF",
	// 	"#E4C5FF",
	// 	"#FFCCF3",
	// 	"#FFC2DB",
	// 	"#FFDCDC",
	// 	"#FFE4DC",
	// 	"#FFEDDC",
	// 	"#FCF7E0",
	// 	"#F6FFE1",
	// 	"#E1FFE3",
	// 	"#D4FCE7",
	// 	"#D2FFFA",
	// 	"#COFFFF",
	// 	"#BDF3FF",
	// 	"#C5ECFF",
	// 	"#BBE2F9",
	// 	"#D2D2FF",
	// 	"#DCDCFF",
	// 	"#E3D2FF",
	// 	"#FFDEFC",
	// 	"#FFD4EE"];

	// const option = {
	// 	backgroundColor: '#fff',
	// 	title: {
	// 		text: '操作系统分布',
	// 		x: 'left',
	// 		textStyle: { fontSize: '15', color: state.charts.color },
	// 	},
	// 	tooltip: { trigger: 'axis' },
	// 	legend: { data: ['供温', '回温', '压力值(Mpa)'], right: 0 },
	// 	grid: { top: 60, right: 30, bottom: 30, left: 30 },
	// 	xAxis: {
	// 		type: 'category',
	// 		axisLine: {
	// 			show: false
	// 		},
	// 		axisTick: {
	// 			show: false
	// 		},
	// 		data: dataList.map(x => x.name),
	// 	},
	// 	yAxis: {
	// 		type: 'value'
	// 	},
	// 	series: [
	// 		{
	// 			type: 'bar',
	// 			barWidth: '12px',
	// 			itemStyle: {
	// 				normal: {
	// 					color: function (params) { // 颜色定制显示（按顺序）
	// 						return colorList[params.dataIndex]
	// 					},
	// 					borderRadius: [10, 10, 0, 0]  //圆角
	// 				}
	// 			},
	// 			label: {
	// 				normal: {
	// 					show: true,
	// 					fontSize: 12,
	// 					color: '#666',
	// 					position: 'top',
	// 				}
	// 			},
	// 			data: dataList.map(x => x.value),
	// 		}
	// 	]
	// };


	// let data = [
	// 	{ value: 3048, name: '高圆圆' },
	// 	{ value: 900, name: '迪丽热巴' },
	// 	{ value: 2048, name: '杨超越' },
	// 	{ value: 1048, name: '刘诗诗' },
	// 	{ value: 6048, name: '刘亦菲' },
	// ]
	// 用的16进制颜色；方便与 外层透明色的修改；
	let colors = [
		"#ff8c71",
		"#ffd768",
		"#DCDCFF",
		"#E3D2FF",
		"#BEDAEE",
	];

	let legends = [];
	data.map((item, k) => {
		legends.push(item.name);
		item['itemStyle'] = { color: colors[k] }
	})
	const computedDataGap = (dataParam, isN2 = false) => {
		let newData = [];
		let gapItem = {
			value: 40,  //间隙值；我这里没计算；可以做一个函数根据总数和需要的value计算添加
			name: null,
			itemStyle: {
				opacity: 0
			},
			tooltip: {  //隐藏这个的鼠标悬浮
				show: false,
			},
		}
		let showLen = dataParam.filter((v) => v.value && v.value > 0);
		if (showLen.length <= 1) {
			return dataParam;
		}
		dataParam.map((v, k) => {
			let v_ = v;
			// 用于判断是否是 外城pie的item
			if (isN2) {
				// 计算传入数据的value总和 用于计算2PI对于总数的均值
				let count = dataParam.map((v) => v.value).reduce((a, b) => a + b);
				let pi = Math.PI * 2 / count;

				// 例如leged2 开始的角度需要加上legend1的结束的位置则加上当前的value
				let beforeCount = 0;
				// for 循环i < k 不包含map循环的item
				for (let i = 0; i < k; i++) {
					beforeCount += dataParam[i].value;
				}
				// 结束的
				let afterCount = beforeCount + v.value;

				let endAngle = pi * beforeCount;
				let startAngle = pi * afterCount;
				let angle = (endAngle + startAngle) / 2;
				angle = angle * 180 / Math.PI;
				v_ = {
					...v,
					itemStyle: {
						color: v.itemStyle.color + '7a'
					},
					label: {
						show: true,
						position: 'inside',
						color: "#000",
						rotate: -angle,
						fontSize: 13,
						color: '#333'
					}
				}
			}
			newData.push(v_)
			if (v.value) {
				newData.push(gapItem)
			}
		})
		return newData;
	}
	let n = computedDataGap(data);
	let n2 = computedDataGap(data, true);
	// 最终数据处理结果在这；一眼懂

	const option = {
		backgroundColor: "#fff",
		title: {
			text: '操作系统分布',
			x: 'left',
			textStyle: { fontSize: '15', color: state.charts.color },
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			// // top: '16%',
			// // left: 'center',
			// position:'right',
			data: legends,
			type: 'scroll',
			orient: 'vertical',
			right: '5%',
			// left: '65%',
			top: '30%',
			itemWidth: 14,
			itemHeight: 14,
		},
		color: colors,
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['45%', '75%'],
				center: ['35%', '55%'],
				// 避免label重叠
				avoidLabelOverlap: false,
				// 占位样式
				emptyCircleStyle: {
					color: 'rgba(255,255,255,0)'
				},
				label: { show: false },
				data: n,
				tooltip: { show: false },
				emphasis: {
					disabled: true
				}
			},
			{
				name: 'Access From',
				type: 'pie',
				radius: ['35%', '65%'],
				center: ['35%', '55%'],
				// 避免label重叠
				avoidLabelOverlap: false,
				// 占位样式
				emptyCircleStyle: {
					color: 'rgba(255,255,255,0)'
				},
				labelLine: {
					show: false
				},
				label: {  //这里加上用于剩余最后一个占满时的旋转； 在data的label没有时则用这个；且data内的优先级高于此
					show: true,
					position: 'inside',
					color: "#000",
					rotate: 0
				},
				data: n2
			}
		]
	};



	state.global.homeChartFour.setOption(option);
	state.myCharts.push(state.global.homeChartFour);
};

// 批量设置 echarts resize
const initEchartsResizeFun = () => {
	nextTick(() => {
		for (let i = 0; i < state.myCharts.length; i++) {
			setTimeout(() => {
				state.myCharts[i].resize();
			}, i * 1000);
		}
	});
};

// 批量设置 echarts resize
const initEchartsResize = () => {
	window.addEventListener('resize', initEchartsResizeFun);
};

// 页面加载时
onMounted(() => {
	initEchartsResize();
	getMainData();
	getDistributionData();
});

// 由于页面缓存原因，keep-alive
onActivated(() => {
	initEchartsResizeFun();
});

// 监听 pinia 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
watch(
	() => isTagsViewCurrenFull.value,
	() => {
		initEchartsResizeFun();
	}
);

// 监听 pinia 中是否开启深色主题
watch(
	() => themeConfig.value.isIsDark,
	(isIsDark) => {
		nextTick(() => {
			state.charts.theme = isIsDark ? 'dark' : '';
			state.charts.bgColor = isIsDark ? 'transparent' : '';
			state.charts.color = isIsDark ? '#dadada' : '#303133';
			setTimeout(() => {
				// initMapChart();
				// initLineChart();
			}, 500);
			setTimeout(() => {
				// initPieChart();
				// initParChart();
			}, 700);
			setTimeout(() => {
				// initBarChart();
			}, 1000);
		});
	},
	{
		deep: true,
		immediate: true,
	}
);

// 获取数据
const getDistributionData = () => {
	useHomeApi().getDistribution().then(res => {
		initParChart(res.data.browser)
		initMapChart(res.data.address);
		initLineChart(res.data.address);
		initPieChart(res.data.os)
	})
}
const getMainData = () => {
	useHomeApi().getMain().then(res => {
		state.mainData=res.data
		console.log('==>>res9999',res)

	})
}

</script>

<style scoped lang="scss">
$homeNavLengh: 8;

.home-container {
	overflow: hidden;

	.home-card-one,
	.home-card-two,
	.home-card-three {
		.home-card-item {
			width: 100%;
			height: 130px;
			border-radius: 4px;
			transition: all ease 0.3s;
			padding: 20px;
			overflow: hidden;
			background: var(--el-color-white);
			color: var(--el-text-color-primary);
			border: 1px solid var(--next-border-color-light);

			&:hover {
				box-shadow: 0 2px 12px var(--next-color-dark-hover);
				transition: all ease 0.3s;
			}

			&-icon {
				width: 70px;
				height: 70px;
				border-radius: 100%;
				flex-shrink: 1;

				i {
					color: var(--el-text-color-placeholder);
				}
			}

			&-title {
				font-size: 15px;
				font-weight: bold;
				height: 30px;
			}
		}
	}

	.home-card-one {
		@for $i from 0 through 3 {
			.home-one-animation#{$i} {
				opacity: 0;
				animation-name: error-num;
				animation-duration: 0.5s;
				animation-fill-mode: forwards;
				animation-delay: calc($i/4) + s;
			}
		}
	}

	.home-card-two,
	.home-card-three {
		.home-card-item {
			height: 620px;
			width: 100%;
			overflow: hidden;

			.home-monitor {
				height: 100%;

				.flex-warp-item {
					width: 25%;
					height: 111px;
					display: flex;

					.flex-warp-item-box {
						margin: auto;
						text-align: center;
						color: var(--el-text-color-primary);
						display: flex;
						border-radius: 5px;
						background: var(--next-bg-color);
						cursor: pointer;
						transition: all 0.3s ease;

						&:hover {
							background: var(--el-color-primary-light-9);
							transition: all 0.3s ease;
						}
					}

					@for $i from 0 through $homeNavLengh {
						.home-animation#{$i} {
							opacity: 0;
							animation-name: error-num;
							animation-duration: 0.5s;
							animation-fill-mode: forwards;
							animation-delay: calc($i/10) + s;
						}
					}
				}
			}
		}

		.home-card-item2 {
			height: 49%;
			width: 100%;
			border-radius: 4px;
			transition: all ease 0.3s;
			padding: 20px;
			overflow: hidden;
			background: var(--el-color-white);
			color: var(--el-text-color-primary);
			border: 1px solid var(--next-border-color-light);

			&:hover {
				box-shadow: 0 2px 12px var(--next-color-dark-hover);
				transition: all ease 0.3s;
			}
		}

		.home-card-item3 {
			height: 49%;
			width: 100%;
			margin-top: 2%;
			border-radius: 4px;
			transition: all ease 0.3s;
			padding: 20px;
			overflow: hidden;
			background: var(--el-color-white);
			color: var(--el-text-color-primary);
			border: 1px solid var(--next-border-color-light);

			&:hover {
				box-shadow: 0 2px 12px var(--next-color-dark-hover);
				transition: all ease 0.3s;
			}
		}
	}

	.personTit {
		font-size: 15px;
		font-weight: bold;
	}
}
</style>
