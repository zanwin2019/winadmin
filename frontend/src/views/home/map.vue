<template>
	<div ref="chinaMap" style="height: 700px;border: solid 1px red;width: 100%"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import chinaJSON from './china.json'
import { onMounted, ref } from 'vue'
const chinaMap = ref()
onMounted(() => {
	drawChina()
})
let dataList = [
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
	{ name: '黑龙江', value: 484 },
	{ name: '吉林', value: 93 },
	{ name: '辽宁', value: 126 },
	{ name: '内蒙古', value: 75 },
	{ name: '山西', value: 133 },
	{ name: '河北', value: 319 },
	{ name: '天津', value: 137 },
	{ name: '北京', value: 512 }
];
function drawChina() {
	var myChart = echarts.init(chinaMap.value)
	echarts.registerMap('china', chinaJSON) //注册可用的地图
	const option = {
		// backgroundColor: state.charts.bgColor,
		title: {
			text: '用户分布',
			x: 'left',
			textStyle: { fontSize: '15', },
		},
		grid: { top: 70, right: 20, bottom: 30, left: 30 },
		// tooltip: {
		// 	triggerOn: "click",
		// 	formatter: function (e, t, n) {
		// 		return '.5' == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
		// 	}
		// },
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
			data: dataList
		}]
	};
	myChart.setOption(option)
}
</script>