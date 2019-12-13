
app.controller("yingpinController", function ($scope, yingpinService, collectionStationService, usersService,recommendService, personService) {
	//截取url name的值
	
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	function changeTime(d){
		  var year=d.getFullYear();
		  var month=change(d.getMonth()+1);
		  var day=change(d.getDate());
		  var hour=change(d.getHours());
		  var minute=change(d.getMinutes());
		  var second=change(d.getSeconds());
		  function change(t){
		    if(t<10){
		     return "0"+t;
		    }else{
		     return t;
		    }
		  }
		  var time=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
		  return time
	}
	var nowDate = new Date()
	var weekDate = new Date((new Date()).getTime() - 7*24*60*60*1000)
	var monthDate = new Date((new Date()).getTime() - 30*24*60*60*1000)

	$scope.todayTime = changeTime(nowDate)
	$scope.weekTime = changeTime(weekDate)
	$scope.monthTime = changeTime(monthDate)

	$scope.initData = {
		jobDetailslist: [],
		// 学历名称
		degreeName: '',
		// 学历列表
		degreeList:[{
			name: '本科-统招',
			value: '00'
		},{
			name: '本科-非统招',
			value: '01'
		},{
			name: '大专-统招',
			value: '02'
		},{
			name: '大专-非统招',
			value: '03'
		},{
			name: '职高',
			value: '04'
		},{
			name: '高中',
			value: '05'
		},{
			name: '其他',
			value: '06'
		}],
		// 城市
		cityList: [{
				code: "010000",
				name: "全国",

			},
			{
				code: "110000",
				name: "北京市",
				children: [{
					code: "110100",
					name: "市辖区",
					children: [{
						code: "110101",
						name: "东城区"
					}, {
						code: "110102",
						name: "西城区"
					}, {
						code: "110105",
						name: "朝阳区"
					}, {
						code: "110106",
						name: "丰台区"
					}, {
						code: "110107",
						name: "石景山区"
					}, {
						code: "110108",
						name: "海淀区"
					}, {
						code: "110109",
						name: "门头沟区"
					}, {
						code: "110111",
						name: "房山区"
					}, {
						code: "110112",
						name: "通州区"
					}, {
						code: "110113",
						name: "顺义区"
					}, {
						code: "110114",
						name: "昌平区"
					}, {
						code: "110115",
						name: "大兴区"
					}, {
						code: "110116",
						name: "怀柔区"
					}, {
						code: "110117",
						name: "平谷区"
					}, {
						code: "110118",
						name: "密云区"
					}, {
						code: "110119",
						name: "延庆区"
					}]
				}]
			},
			{
				code: "120000",
				name: "天津市",
				children: [{
					code: "120100",
					name: "市辖区",
					children: [{
						code: "120101",
						name: "和平区"
					}, {
						code: "120102",
						name: "河东区"
					}, {
						code: "120103",
						name: "河西区"
					}, {
						code: "120104",
						name: "南开区"
					}, {
						code: "120105",
						name: "河北区"
					}, {
						code: "120106",
						name: "红桥区"
					}, {
						code: "120110",
						name: "东丽区"
					}, {
						code: "120111",
						name: "西青区"
					}, {
						code: "120112",
						name: "津南区"
					}, {
						code: "120113",
						name: "北辰区"
					}, {
						code: "120114",
						name: "武清区"
					}, {
						code: "120115",
						name: "宝坻区"
					}, {
						code: "120116",
						name: "滨海新区"
					}, {
						code: "120117",
						name: "宁河区"
					}, {
						code: "120118",
						name: "静海区"
					}, {
						code: "120119",
						name: "蓟州区"
					}]
				}]
			}, {
				code: "130000",
				name: "河北省",
				children: [{
					code: "130100",
					name: "石家庄市",
					children: [{
						code: "130101",
						name: "市辖区"
					}, {
						code: "130102",
						name: "长安区"
					}, {
						code: "130104",
						name: "桥西区"
					}, {
						code: "130105",
						name: "新华区"
					}, {
						code: "130107",
						name: "井陉矿区"
					}, {
						code: "130108",
						name: "裕华区"
					}, {
						code: "130109",
						name: "藁城区"
					}, {
						code: "130110",
						name: "鹿泉区"
					}, {
						code: "130111",
						name: "栾城区"
					}, {
						code: "130121",
						name: "井陉县"
					}, {
						code: "130123",
						name: "正定县"
					}, {
						code: "130125",
						name: "行唐县"
					}, {
						code: "130126",
						name: "灵寿县"
					}, {
						code: "130127",
						name: "高邑县"
					}, {
						code: "130128",
						name: "深泽县"
					}, {
						code: "130129",
						name: "赞皇县"
					}, {
						code: "130130",
						name: "无极县"
					}, {
						code: "130131",
						name: "平山县"
					}, {
						code: "130132",
						name: "元氏县"
					}, {
						code: "130133",
						name: "赵县"
					}, {
						code: "130183",
						name: "晋州市"
					}, {
						code: "130184",
						name: "新乐市"
					}]
				}, {
					code: "130200",
					name: "唐山市",
					children: [{
						code: "130201",
						name: "市辖区"
					}, {
						code: "130202",
						name: "路南区"
					}, {
						code: "130203",
						name: "路北区"
					}, {
						code: "130204",
						name: "古冶区"
					}, {
						code: "130205",
						name: "开平区"
					}, {
						code: "130207",
						name: "丰南区"
					}, {
						code: "130208",
						name: "丰润区"
					}, {
						code: "130209",
						name: "曹妃甸区"
					}, {
						code: "130223",
						name: "滦县"
					}, {
						code: "130224",
						name: "滦南县"
					}, {
						code: "130225",
						name: "乐亭县"
					}, {
						code: "130227",
						name: "迁西县"
					}, {
						code: "130229",
						name: "玉田县"
					}, {
						code: "130281",
						name: "遵化市"
					}, {
						code: "130283",
						name: "迁安市"
					}]
				}, {
					code: "130300",
					name: "秦皇岛市",
					children: [{
						code: "130301",
						name: "市辖区"
					}, {
						code: "130302",
						name: "海港区"
					}, {
						code: "130303",
						name: "山海关区"
					}, {
						code: "130304",
						name: "北戴河区"
					}, {
						code: "130306",
						name: "抚宁区"
					}, {
						code: "130321",
						name: "青龙满族自治县"
					}, {
						code: "130322",
						name: "昌黎县"
					}, {
						code: "130324",
						name: "卢龙县"
					}]
				}, {
					code: "130400",
					name: "邯郸市",
					children: [{
						code: "130401",
						name: "市辖区"
					}, {
						code: "130402",
						name: "邯山区"
					}, {
						code: "130403",
						name: "丛台区"
					}, {
						code: "130404",
						name: "复兴区"
					}, {
						code: "130406",
						name: "峰峰矿区"
					}, {
						code: "130421",
						name: "邯郸县"
					}, {
						code: "130423",
						name: "临漳县"
					}, {
						code: "130424",
						name: "成安县"
					}, {
						code: "130425",
						name: "大名县"
					}, {
						code: "130426",
						name: "涉县"
					}, {
						code: "130427",
						name: "磁县"
					}, {
						code: "130428",
						name: "肥乡县"
					}, {
						code: "130429",
						name: "永年县"
					}, {
						code: "130430",
						name: "邱县"
					}, {
						code: "130431",
						name: "鸡泽县"
					}, {
						code: "130432",
						name: "广平县"
					}, {
						code: "130433",
						name: "馆陶县"
					}, {
						code: "130434",
						name: "魏县"
					}, {
						code: "130435",
						name: "曲周县"
					}, {
						code: "130481",
						name: "武安市"
					}]
				}, {
					code: "130500",
					name: "邢台市",
					children: [{
						code: "130501",
						name: "市辖区"
					}, {
						code: "130502",
						name: "桥东区"
					}, {
						code: "130503",
						name: "桥西区"
					}, {
						code: "130521",
						name: "邢台县"
					}, {
						code: "130522",
						name: "临城县"
					}, {
						code: "130523",
						name: "内丘县"
					}, {
						code: "130524",
						name: "柏乡县"
					}, {
						code: "130525",
						name: "隆尧县"
					}, {
						code: "130526",
						name: "任县"
					}, {
						code: "130527",
						name: "南和县"
					}, {
						code: "130528",
						name: "宁晋县"
					}, {
						code: "130529",
						name: "巨鹿县"
					}, {
						code: "130530",
						name: "新河县"
					}, {
						code: "130531",
						name: "广宗县"
					}, {
						code: "130532",
						name: "平乡县"
					}, {
						code: "130533",
						name: "威县"
					}, {
						code: "130534",
						name: "清河县"
					}, {
						code: "130535",
						name: "临西县"
					}, {
						code: "130581",
						name: "南宫市"
					}, {
						code: "130582",
						name: "沙河市"
					}]
				}, {
					code: "130600",
					name: "保定市",
					children: [{
						code: "130601",
						name: "市辖区"
					}, {
						code: "130602",
						name: "竞秀区"
					}, {
						code: "130606",
						name: "莲池区"
					}, {
						code: "130607",
						name: "满城区"
					}, {
						code: "130608",
						name: "清苑区"
					}, {
						code: "130609",
						name: "徐水区"
					}, {
						code: "130623",
						name: "涞水县"
					}, {
						code: "130624",
						name: "阜平县"
					}, {
						code: "130626",
						name: "定兴县"
					}, {
						code: "130627",
						name: "唐县"
					}, {
						code: "130628",
						name: "高阳县"
					}, {
						code: "130629",
						name: "容城县"
					}, {
						code: "130630",
						name: "涞源县"
					}, {
						code: "130631",
						name: "望都县"
					}, {
						code: "130632",
						name: "安新县"
					}, {
						code: "130633",
						name: "易县"
					}, {
						code: "130634",
						name: "曲阳县"
					}, {
						code: "130635",
						name: "蠡县"
					}, {
						code: "130636",
						name: "顺平县"
					}, {
						code: "130637",
						name: "博野县"
					}, {
						code: "130638",
						name: "雄县"
					}, {
						code: "130681",
						name: "涿州市"
					}, {
						code: "130683",
						name: "安国市"
					}, {
						code: "130684",
						name: "高碑店市"
					}]
				}, {
					code: "130700",
					name: "张家口市",
					children: [{
						code: "130701",
						name: "市辖区"
					}, {
						code: "130702",
						name: "桥东区"
					}, {
						code: "130703",
						name: "桥西区"
					}, {
						code: "130705",
						name: "宣化区"
					}, {
						code: "130706",
						name: "下花园区"
					}, {
						code: "130708",
						name: "万全区"
					}, {
						code: "130709",
						name: "崇礼区"
					}, {
						code: "130722",
						name: "张北县"
					}, {
						code: "130723",
						name: "康保县"
					}, {
						code: "130724",
						name: "沽源县"
					}, {
						code: "130725",
						name: "尚义县"
					}, {
						code: "130726",
						name: "蔚县"
					}, {
						code: "130727",
						name: "阳原县"
					}, {
						code: "130728",
						name: "怀安县"
					}, {
						code: "130730",
						name: "怀来县"
					}, {
						code: "130731",
						name: "涿鹿县"
					}, {
						code: "130732",
						name: "赤城县"
					}]
				}, {
					code: "130800",
					name: "承德市",
					children: [{
						code: "130801",
						name: "市辖区"
					}, {
						code: "130802",
						name: "双桥区"
					}, {
						code: "130803",
						name: "双滦区"
					}, {
						code: "130804",
						name: "鹰手营子矿区"
					}, {
						code: "130821",
						name: "承德县"
					}, {
						code: "130822",
						name: "兴隆县"
					}, {
						code: "130823",
						name: "平泉县"
					}, {
						code: "130824",
						name: "滦平县"
					}, {
						code: "130825",
						name: "隆化县"
					}, {
						code: "130826",
						name: "丰宁满族自治县"
					}, {
						code: "130827",
						name: "宽城满族自治县"
					}, {
						code: "130828",
						name: "围场满族蒙古族自治县"
					}]
				}, {
					code: "130900",
					name: "沧州市",
					children: [{
						code: "130901",
						name: "市辖区"
					}, {
						code: "130902",
						name: "新华区"
					}, {
						code: "130903",
						name: "运河区"
					}, {
						code: "130921",
						name: "沧县"
					}, {
						code: "130922",
						name: "青县"
					}, {
						code: "130923",
						name: "东光县"
					}, {
						code: "130924",
						name: "海兴县"
					}, {
						code: "130925",
						name: "盐山县"
					}, {
						code: "130926",
						name: "肃宁县"
					}, {
						code: "130927",
						name: "南皮县"
					}, {
						code: "130928",
						name: "吴桥县"
					}, {
						code: "130929",
						name: "献县"
					}, {
						code: "130930",
						name: "孟村回族自治县"
					}, {
						code: "130981",
						name: "泊头市"
					}, {
						code: "130982",
						name: "任丘市"
					}, {
						code: "130983",
						name: "黄骅市"
					}, {
						code: "130984",
						name: "河间市"
					}]
				}, {
					code: "131000",
					name: "廊坊市",
					children: [{
						code: "131001",
						name: "市辖区"
					}, {
						code: "131002",
						name: "安次区"
					}, {
						code: "131003",
						name: "广阳区"
					}, {
						code: "131022",
						name: "固安县"
					}, {
						code: "131023",
						name: "永清县"
					}, {
						code: "131024",
						name: "香河县"
					}, {
						code: "131025",
						name: "大城县"
					}, {
						code: "131026",
						name: "文安县"
					}, {
						code: "131028",
						name: "大厂回族自治县"
					}, {
						code: "131081",
						name: "霸州市"
					}, {
						code: "131082",
						name: "三河市"
					}]
				}, {
					code: "131100",
					name: "衡水市",
					children: [{
						code: "131101",
						name: "市辖区"
					}, {
						code: "131102",
						name: "桃城区"
					}, {
						code: "131103",
						name: "冀州区"
					}, {
						code: "131121",
						name: "枣强县"
					}, {
						code: "131122",
						name: "武邑县"
					}, {
						code: "131123",
						name: "武强县"
					}, {
						code: "131124",
						name: "饶阳县"
					}, {
						code: "131125",
						name: "安平县"
					}, {
						code: "131126",
						name: "故城县"
					}, {
						code: "131127",
						name: "景县"
					}, {
						code: "131128",
						name: "阜城县"
					}, {
						code: "131182",
						name: "深州市"
					}]
				}, {
					code: "139000",
					name: "省直辖县级行政区划",
					children: [{
						code: "139001",
						name: "定州市"
					}, {
						code: "139002",
						name: "辛集市"
					}]
				}]
			}, {
				code: "140000",
				name: "山西省",
				children: [{
					code: "140100",
					name: "太原市",
					children: [{
						code: "140101",
						name: "市辖区"
					}, {
						code: "140105",
						name: "小店区"
					}, {
						code: "140106",
						name: "迎泽区"
					}, {
						code: "140107",
						name: "杏花岭区"
					}, {
						code: "140108",
						name: "尖草坪区"
					}, {
						code: "140109",
						name: "万柏林区"
					}, {
						code: "140110",
						name: "晋源区"
					}, {
						code: "140121",
						name: "清徐县"
					}, {
						code: "140122",
						name: "阳曲县"
					}, {
						code: "140123",
						name: "娄烦县"
					}, {
						code: "140181",
						name: "古交市"
					}]
				}, {
					code: "140200",
					name: "大同市",
					children: [{
						code: "140201",
						name: "市辖区"
					}, {
						code: "140202",
						name: "城区"
					}, {
						code: "140203",
						name: "矿区"
					}, {
						code: "140211",
						name: "南郊区"
					}, {
						code: "140212",
						name: "新荣区"
					}, {
						code: "140221",
						name: "阳高县"
					}, {
						code: "140222",
						name: "天镇县"
					}, {
						code: "140223",
						name: "广灵县"
					}, {
						code: "140224",
						name: "灵丘县"
					}, {
						code: "140225",
						name: "浑源县"
					}, {
						code: "140226",
						name: "左云县"
					}, {
						code: "140227",
						name: "大同县"
					}]
				}, {
					code: "140300",
					name: "阳泉市",
					children: [{
						code: "140301",
						name: "市辖区"
					}, {
						code: "140302",
						name: "城区"
					}, {
						code: "140303",
						name: "矿区"
					}, {
						code: "140311",
						name: "郊区"
					}, {
						code: "140321",
						name: "平定县"
					}, {
						code: "140322",
						name: "盂县"
					}]
				}, {
					code: "140400",
					name: "长治市",
					children: [{
						code: "140401",
						name: "市辖区"
					}, {
						code: "140402",
						name: "城区"
					}, {
						code: "140411",
						name: "郊区"
					}, {
						code: "140421",
						name: "长治县"
					}, {
						code: "140423",
						name: "襄垣县"
					}, {
						code: "140424",
						name: "屯留县"
					}, {
						code: "140425",
						name: "平顺县"
					}, {
						code: "140426",
						name: "黎城县"
					}, {
						code: "140427",
						name: "壶关县"
					}, {
						code: "140428",
						name: "长子县"
					}, {
						code: "140429",
						name: "武乡县"
					}, {
						code: "140430",
						name: "沁县"
					}, {
						code: "140431",
						name: "沁源县"
					}, {
						code: "140481",
						name: "潞城市"
					}]
				}, {
					code: "140500",
					name: "晋城市",
					children: [{
						code: "140501",
						name: "市辖区"
					}, {
						code: "140502",
						name: "城区"
					}, {
						code: "140521",
						name: "沁水县"
					}, {
						code: "140522",
						name: "阳城县"
					}, {
						code: "140524",
						name: "陵川县"
					}, {
						code: "140525",
						name: "泽州县"
					}, {
						code: "140581",
						name: "高平市"
					}]
				}, {
					code: "140600",
					name: "朔州市",
					children: [{
						code: "140601",
						name: "市辖区"
					}, {
						code: "140602",
						name: "朔城区"
					}, {
						code: "140603",
						name: "平鲁区"
					}, {
						code: "140621",
						name: "山阴县"
					}, {
						code: "140622",
						name: "应县"
					}, {
						code: "140623",
						name: "右玉县"
					}, {
						code: "140624",
						name: "怀仁县"
					}]
				}, {
					code: "140700",
					name: "晋中市",
					children: [{
						code: "140701",
						name: "市辖区"
					}, {
						code: "140702",
						name: "榆次区"
					}, {
						code: "140721",
						name: "榆社县"
					}, {
						code: "140722",
						name: "左权县"
					}, {
						code: "140723",
						name: "和顺县"
					}, {
						code: "140724",
						name: "昔阳县"
					}, {
						code: "140725",
						name: "寿阳县"
					}, {
						code: "140726",
						name: "太谷县"
					}, {
						code: "140727",
						name: "祁县"
					}, {
						code: "140728",
						name: "平遥县"
					}, {
						code: "140729",
						name: "灵石县"
					}, {
						code: "140781",
						name: "介休市"
					}]
				}, {
					code: "140800",
					name: "运城市",
					children: [{
						code: "140801",
						name: "市辖区"
					}, {
						code: "140802",
						name: "盐湖区"
					}, {
						code: "140821",
						name: "临猗县"
					}, {
						code: "140822",
						name: "万荣县"
					}, {
						code: "140823",
						name: "闻喜县"
					}, {
						code: "140824",
						name: "稷山县"
					}, {
						code: "140825",
						name: "新绛县"
					}, {
						code: "140826",
						name: "绛县"
					}, {
						code: "140827",
						name: "垣曲县"
					}, {
						code: "140828",
						name: "夏县"
					}, {
						code: "140829",
						name: "平陆县"
					}, {
						code: "140830",
						name: "芮城县"
					}, {
						code: "140881",
						name: "永济市"
					}, {
						code: "140882",
						name: "河津市"
					}]
				}, {
					code: "140900",
					name: "忻州市",
					children: [{
						code: "140901",
						name: "市辖区"
					}, {
						code: "140902",
						name: "忻府区"
					}, {
						code: "140921",
						name: "定襄县"
					}, {
						code: "140922",
						name: "五台县"
					}, {
						code: "140923",
						name: "代县"
					}, {
						code: "140924",
						name: "繁峙县"
					}, {
						code: "140925",
						name: "宁武县"
					}, {
						code: "140926",
						name: "静乐县"
					}, {
						code: "140927",
						name: "神池县"
					}, {
						code: "140928",
						name: "五寨县"
					}, {
						code: "140929",
						name: "岢岚县"
					}, {
						code: "140930",
						name: "河曲县"
					}, {
						code: "140931",
						name: "保德县"
					}, {
						code: "140932",
						name: "偏关县"
					}, {
						code: "140981",
						name: "原平市"
					}]
				}, {
					code: "141000",
					name: "临汾市",
					children: [{
						code: "141001",
						name: "市辖区"
					}, {
						code: "141002",
						name: "尧都区"
					}, {
						code: "141021",
						name: "曲沃县"
					}, {
						code: "141022",
						name: "翼城县"
					}, {
						code: "141023",
						name: "襄汾县"
					}, {
						code: "141024",
						name: "洪洞县"
					}, {
						code: "141025",
						name: "古县"
					}, {
						code: "141026",
						name: "安泽县"
					}, {
						code: "141027",
						name: "浮山县"
					}, {
						code: "141028",
						name: "吉县"
					}, {
						code: "141029",
						name: "乡宁县"
					}, {
						code: "141030",
						name: "大宁县"
					}, {
						code: "141031",
						name: "隰县"
					}, {
						code: "141032",
						name: "永和县"
					}, {
						code: "141033",
						name: "蒲县"
					}, {
						code: "141034",
						name: "汾西县"
					}, {
						code: "141081",
						name: "侯马市"
					}, {
						code: "141082",
						name: "霍州市"
					}]
				}, {
					code: "141100",
					name: "吕梁市",
					children: [{
						code: "141101",
						name: "市辖区"
					}, {
						code: "141102",
						name: "离石区"
					}, {
						code: "141121",
						name: "文水县"
					}, {
						code: "141122",
						name: "交城县"
					}, {
						code: "141123",
						name: "兴县"
					}, {
						code: "141124",
						name: "临县"
					}, {
						code: "141125",
						name: "柳林县"
					}, {
						code: "141126",
						name: "石楼县"
					}, {
						code: "141127",
						name: "岚县"
					}, {
						code: "141128",
						name: "方山县"
					}, {
						code: "141129",
						name: "中阳县"
					}, {
						code: "141130",
						name: "交口县"
					}, {
						code: "141181",
						name: "孝义市"
					}, {
						code: "141182",
						name: "汾阳市"
					}]
				}]
			}, {
				code: "150000",
				name: "内蒙古自治区",
				children: [{
					code: "150100",
					name: "呼和浩特市",
					children: [{
						code: "150101",
						name: "市辖区"
					}, {
						code: "150102",
						name: "新城区"
					}, {
						code: "150103",
						name: "回民区"
					}, {
						code: "150104",
						name: "玉泉区"
					}, {
						code: "150105",
						name: "赛罕区"
					}, {
						code: "150121",
						name: "土默特左旗"
					}, {
						code: "150122",
						name: "托克托县"
					}, {
						code: "150123",
						name: "和林格尔县"
					}, {
						code: "150124",
						name: "清水河县"
					}, {
						code: "150125",
						name: "武川县"
					}]
				}, {
					code: "150200",
					name: "包头市",
					children: [{
						code: "150201",
						name: "市辖区"
					}, {
						code: "150202",
						name: "东河区"
					}, {
						code: "150203",
						name: "昆都仑区"
					}, {
						code: "150204",
						name: "青山区"
					}, {
						code: "150205",
						name: "石拐区"
					}, {
						code: "150206",
						name: "白云鄂博矿区"
					}, {
						code: "150207",
						name: "九原区"
					}, {
						code: "150221",
						name: "土默特右旗"
					}, {
						code: "150222",
						name: "固阳县"
					}, {
						code: "150223",
						name: "达尔罕茂明安联合旗"
					}]
				}, {
					code: "150300",
					name: "乌海市",
					children: [{
						code: "150301",
						name: "市辖区"
					}, {
						code: "150302",
						name: "海勃湾区"
					}, {
						code: "150303",
						name: "海南区"
					}, {
						code: "150304",
						name: "乌达区"
					}]
				}, {
					code: "150400",
					name: "赤峰市",
					children: [{
						code: "150401",
						name: "市辖区"
					}, {
						code: "150402",
						name: "红山区"
					}, {
						code: "150403",
						name: "元宝山区"
					}, {
						code: "150404",
						name: "松山区"
					}, {
						code: "150421",
						name: "阿鲁科尔沁旗"
					}, {
						code: "150422",
						name: "巴林左旗"
					}, {
						code: "150423",
						name: "巴林右旗"
					}, {
						code: "150424",
						name: "林西县"
					}, {
						code: "150425",
						name: "克什克腾旗"
					}, {
						code: "150426",
						name: "翁牛特旗"
					}, {
						code: "150428",
						name: "喀喇沁旗"
					}, {
						code: "150429",
						name: "宁城县"
					}, {
						code: "150430",
						name: "敖汉旗"
					}]
				}, {
					code: "150500",
					name: "通辽市",
					children: [{
						code: "150501",
						name: "市辖区"
					}, {
						code: "150502",
						name: "科尔沁区"
					}, {
						code: "150521",
						name: "科尔沁左翼中旗"
					}, {
						code: "150522",
						name: "科尔沁左翼后旗"
					}, {
						code: "150523",
						name: "开鲁县"
					}, {
						code: "150524",
						name: "库伦旗"
					}, {
						code: "150525",
						name: "奈曼旗"
					}, {
						code: "150526",
						name: "扎鲁特旗"
					}, {
						code: "150581",
						name: "霍林郭勒市"
					}]
				}, {
					code: "150600",
					name: "鄂尔多斯市",
					children: [{
						code: "150601",
						name: "市辖区"
					}, {
						code: "150602",
						name: "东胜区"
					}, {
						code: "150603",
						name: "康巴什区"
					}, {
						code: "150621",
						name: "达拉特旗"
					}, {
						code: "150622",
						name: "准格尔旗"
					}, {
						code: "150623",
						name: "鄂托克前旗"
					}, {
						code: "150624",
						name: "鄂托克旗"
					}, {
						code: "150625",
						name: "杭锦旗"
					}, {
						code: "150626",
						name: "乌审旗"
					}, {
						code: "150627",
						name: "伊金霍洛旗"
					}]
				}, {
					code: "150700",
					name: "呼伦贝尔市",
					children: [{
						code: "150701",
						name: "市辖区"
					}, {
						code: "150702",
						name: "海拉尔区"
					}, {
						code: "150703",
						name: "扎赉诺尔区"
					}, {
						code: "150721",
						name: "阿荣旗"
					}, {
						code: "150722",
						name: "莫力达瓦达斡尔族自治旗"
					}, {
						code: "150723",
						name: "鄂伦春自治旗"
					}, {
						code: "150724",
						name: "鄂温克族自治旗"
					}, {
						code: "150725",
						name: "陈巴尔虎旗"
					}, {
						code: "150726",
						name: "新巴尔虎左旗"
					}, {
						code: "150727",
						name: "新巴尔虎右旗"
					}, {
						code: "150781",
						name: "满洲里市"
					}, {
						code: "150782",
						name: "牙克石市"
					}, {
						code: "150783",
						name: "扎兰屯市"
					}, {
						code: "150784",
						name: "额尔古纳市"
					}, {
						code: "150785",
						name: "根河市"
					}]
				}, {
					code: "150800",
					name: "巴彦淖尔市",
					children: [{
						code: "150801",
						name: "市辖区"
					}, {
						code: "150802",
						name: "临河区"
					}, {
						code: "150821",
						name: "五原县"
					}, {
						code: "150822",
						name: "磴口县"
					}, {
						code: "150823",
						name: "乌拉特前旗"
					}, {
						code: "150824",
						name: "乌拉特中旗"
					}, {
						code: "150825",
						name: "乌拉特后旗"
					}, {
						code: "150826",
						name: "杭锦后旗"
					}]
				}, {
					code: "150900",
					name: "乌兰察布市",
					children: [{
						code: "150901",
						name: "市辖区"
					}, {
						code: "150902",
						name: "集宁区"
					}, {
						code: "150921",
						name: "卓资县"
					}, {
						code: "150922",
						name: "化德县"
					}, {
						code: "150923",
						name: "商都县"
					}, {
						code: "150924",
						name: "兴和县"
					}, {
						code: "150925",
						name: "凉城县"
					}, {
						code: "150926",
						name: "察哈尔右翼前旗"
					}, {
						code: "150927",
						name: "察哈尔右翼中旗"
					}, {
						code: "150928",
						name: "察哈尔右翼后旗"
					}, {
						code: "150929",
						name: "四子王旗"
					}, {
						code: "150981",
						name: "丰镇市"
					}]
				}, {
					code: "152200",
					name: "兴安盟",
					children: [{
						code: "152201",
						name: "乌兰浩特市"
					}, {
						code: "152202",
						name: "阿尔山市"
					}, {
						code: "152221",
						name: "科尔沁右翼前旗"
					}, {
						code: "152222",
						name: "科尔沁右翼中旗"
					}, {
						code: "152223",
						name: "扎赉特旗"
					}, {
						code: "152224",
						name: "突泉县"
					}]
				}, {
					code: "152500",
					name: "锡林郭勒盟",
					children: [{
						code: "152501",
						name: "二连浩特市"
					}, {
						code: "152502",
						name: "锡林浩特市"
					}, {
						code: "152522",
						name: "阿巴嘎旗"
					}, {
						code: "152523",
						name: "苏尼特左旗"
					}, {
						code: "152524",
						name: "苏尼特右旗"
					}, {
						code: "152525",
						name: "东乌珠穆沁旗"
					}, {
						code: "152526",
						name: "西乌珠穆沁旗"
					}, {
						code: "152527",
						name: "太仆寺旗"
					}, {
						code: "152528",
						name: "镶黄旗"
					}, {
						code: "152529",
						name: "正镶白旗"
					}, {
						code: "152530",
						name: "正蓝旗"
					}, {
						code: "152531",
						name: "多伦县"
					}]
				}, {
					code: "152900",
					name: "阿拉善盟",
					children: [{
						code: "152921",
						name: "阿拉善左旗"
					}, {
						code: "152922",
						name: "阿拉善右旗"
					}, {
						code: "152923",
						name: "额济纳旗"
					}]
				}]
			}, {
				code: "210000",
				name: "辽宁省",
				children: [{
					code: "210100",
					name: "沈阳市",
					children: [{
						code: "210101",
						name: "市辖区"
					}, {
						code: "210102",
						name: "和平区"
					}, {
						code: "210103",
						name: "沈河区"
					}, {
						code: "210104",
						name: "大东区"
					}, {
						code: "210105",
						name: "皇姑区"
					}, {
						code: "210106",
						name: "铁西区"
					}, {
						code: "210111",
						name: "苏家屯区"
					}, {
						code: "210112",
						name: "浑南区"
					}, {
						code: "210113",
						name: "沈北新区"
					}, {
						code: "210114",
						name: "于洪区"
					}, {
						code: "210115",
						name: "辽中区"
					}, {
						code: "210123",
						name: "康平县"
					}, {
						code: "210124",
						name: "法库县"
					}, {
						code: "210181",
						name: "新民市"
					}]
				}, {
					code: "210200",
					name: "大连市",
					children: [{
						code: "210201",
						name: "市辖区"
					}, {
						code: "210202",
						name: "中山区"
					}, {
						code: "210203",
						name: "西岗区"
					}, {
						code: "210204",
						name: "沙河口区"
					}, {
						code: "210211",
						name: "甘井子区"
					}, {
						code: "210212",
						name: "旅顺口区"
					}, {
						code: "210213",
						name: "金州区"
					}, {
						code: "210214",
						name: "普兰店区"
					}, {
						code: "210224",
						name: "长海县"
					}, {
						code: "210281",
						name: "瓦房店市"
					}, {
						code: "210283",
						name: "庄河市"
					}]
				}, {
					code: "210300",
					name: "鞍山市",
					children: [{
						code: "210301",
						name: "市辖区"
					}, {
						code: "210302",
						name: "铁东区"
					}, {
						code: "210303",
						name: "铁西区"
					}, {
						code: "210304",
						name: "立山区"
					}, {
						code: "210311",
						name: "千山区"
					}, {
						code: "210321",
						name: "台安县"
					}, {
						code: "210323",
						name: "岫岩满族自治县"
					}, {
						code: "210381",
						name: "海城市"
					}]
				}, {
					code: "210400",
					name: "抚顺市",
					children: [{
						code: "210401",
						name: "市辖区"
					}, {
						code: "210402",
						name: "新抚区"
					}, {
						code: "210403",
						name: "东洲区"
					}, {
						code: "210404",
						name: "望花区"
					}, {
						code: "210411",
						name: "顺城区"
					}, {
						code: "210421",
						name: "抚顺县"
					}, {
						code: "210422",
						name: "新宾满族自治县"
					}, {
						code: "210423",
						name: "清原满族自治县"
					}]
				}, {
					code: "210500",
					name: "本溪市",
					children: [{
						code: "210501",
						name: "市辖区"
					}, {
						code: "210502",
						name: "平山区"
					}, {
						code: "210503",
						name: "溪湖区"
					}, {
						code: "210504",
						name: "明山区"
					}, {
						code: "210505",
						name: "南芬区"
					}, {
						code: "210521",
						name: "本溪满族自治县"
					}, {
						code: "210522",
						name: "桓仁满族自治县"
					}]
				}, {
					code: "210600",
					name: "丹东市",
					children: [{
						code: "210601",
						name: "市辖区"
					}, {
						code: "210602",
						name: "元宝区"
					}, {
						code: "210603",
						name: "振兴区"
					}, {
						code: "210604",
						name: "振安区"
					}, {
						code: "210624",
						name: "宽甸满族自治县"
					}, {
						code: "210681",
						name: "东港市"
					}, {
						code: "210682",
						name: "凤城市"
					}]
				}, {
					code: "210700",
					name: "锦州市",
					children: [{
						code: "210701",
						name: "市辖区"
					}, {
						code: "210702",
						name: "古塔区"
					}, {
						code: "210703",
						name: "凌河区"
					}, {
						code: "210711",
						name: "太和区"
					}, {
						code: "210726",
						name: "黑山县"
					}, {
						code: "210727",
						name: "义县"
					}, {
						code: "210781",
						name: "凌海市"
					}, {
						code: "210782",
						name: "北镇市"
					}]
				}, {
					code: "210800",
					name: "营口市",
					children: [{
						code: "210801",
						name: "市辖区"
					}, {
						code: "210802",
						name: "站前区"
					}, {
						code: "210803",
						name: "西市区"
					}, {
						code: "210804",
						name: "鲅鱼圈区"
					}, {
						code: "210811",
						name: "老边区"
					}, {
						code: "210881",
						name: "盖州市"
					}, {
						code: "210882",
						name: "大石桥市"
					}]
				}, {
					code: "210900",
					name: "阜新市",
					children: [{
						code: "210901",
						name: "市辖区"
					}, {
						code: "210902",
						name: "海州区"
					}, {
						code: "210903",
						name: "新邱区"
					}, {
						code: "210904",
						name: "太平区"
					}, {
						code: "210905",
						name: "清河门区"
					}, {
						code: "210911",
						name: "细河区"
					}, {
						code: "210921",
						name: "阜新蒙古族自治县"
					}, {
						code: "210922",
						name: "彰武县"
					}]
				}, {
					code: "211000",
					name: "辽阳市",
					children: [{
						code: "211001",
						name: "市辖区"
					}, {
						code: "211002",
						name: "白塔区"
					}, {
						code: "211003",
						name: "文圣区"
					}, {
						code: "211004",
						name: "宏伟区"
					}, {
						code: "211005",
						name: "弓长岭区"
					}, {
						code: "211011",
						name: "太子河区"
					}, {
						code: "211021",
						name: "辽阳县"
					}, {
						code: "211081",
						name: "灯塔市"
					}]
				}, {
					code: "211100",
					name: "盘锦市",
					children: [{
						code: "211101",
						name: "市辖区"
					}, {
						code: "211102",
						name: "双台子区"
					}, {
						code: "211103",
						name: "兴隆台区"
					}, {
						code: "211104",
						name: "大洼区"
					}, {
						code: "211122",
						name: "盘山县"
					}]
				}, {
					code: "211200",
					name: "铁岭市",
					children: [{
						code: "211201",
						name: "市辖区"
					}, {
						code: "211202",
						name: "银州区"
					}, {
						code: "211204",
						name: "清河区"
					}, {
						code: "211221",
						name: "铁岭县"
					}, {
						code: "211223",
						name: "西丰县"
					}, {
						code: "211224",
						name: "昌图县"
					}, {
						code: "211281",
						name: "调兵山市"
					}, {
						code: "211282",
						name: "开原市"
					}]
				}, {
					code: "211300",
					name: "朝阳市",
					children: [{
						code: "211301",
						name: "市辖区"
					}, {
						code: "211302",
						name: "双塔区"
					}, {
						code: "211303",
						name: "龙城区"
					}, {
						code: "211321",
						name: "朝阳县"
					}, {
						code: "211322",
						name: "建平县"
					}, {
						code: "211324",
						name: "喀喇沁左翼蒙古族自治县"
					}, {
						code: "211381",
						name: "北票市"
					}, {
						code: "211382",
						name: "凌源市"
					}]
				}, {
					code: "211400",
					name: "葫芦岛市",
					children: [{
						code: "211401",
						name: "市辖区"
					}, {
						code: "211402",
						name: "连山区"
					}, {
						code: "211403",
						name: "龙港区"
					}, {
						code: "211404",
						name: "南票区"
					}, {
						code: "211421",
						name: "绥中县"
					}, {
						code: "211422",
						name: "建昌县"
					}, {
						code: "211481",
						name: "兴城市"
					}]
				}]
			}, {
				code: "220000",
				name: "吉林省",
				children: [{
					code: "220100",
					name: "长春市",
					children: [{
						code: "220101",
						name: "市辖区"
					}, {
						code: "220102",
						name: "南关区"
					}, {
						code: "220103",
						name: "宽城区"
					}, {
						code: "220104",
						name: "朝阳区"
					}, {
						code: "220105",
						name: "二道区"
					}, {
						code: "220106",
						name: "绿园区"
					}, {
						code: "220112",
						name: "双阳区"
					}, {
						code: "220113",
						name: "九台区"
					}, {
						code: "220122",
						name: "农安县"
					}, {
						code: "220182",
						name: "榆树市"
					}, {
						code: "220183",
						name: "德惠市"
					}]
				}, {
					code: "220200",
					name: "吉林市",
					children: [{
						code: "220201",
						name: "市辖区"
					}, {
						code: "220202",
						name: "昌邑区"
					}, {
						code: "220203",
						name: "龙潭区"
					}, {
						code: "220204",
						name: "船营区"
					}, {
						code: "220211",
						name: "丰满区"
					}, {
						code: "220221",
						name: "永吉县"
					}, {
						code: "220281",
						name: "蛟河市"
					}, {
						code: "220282",
						name: "桦甸市"
					}, {
						code: "220283",
						name: "舒兰市"
					}, {
						code: "220284",
						name: "磐石市"
					}]
				}, {
					code: "220300",
					name: "四平市",
					children: [{
						code: "220301",
						name: "市辖区"
					}, {
						code: "220302",
						name: "铁西区"
					}, {
						code: "220303",
						name: "铁东区"
					}, {
						code: "220322",
						name: "梨树县"
					}, {
						code: "220323",
						name: "伊通满族自治县"
					}, {
						code: "220381",
						name: "公主岭市"
					}, {
						code: "220382",
						name: "双辽市"
					}]
				}, {
					code: "220400",
					name: "辽源市",
					children: [{
						code: "220401",
						name: "市辖区"
					}, {
						code: "220402",
						name: "龙山区"
					}, {
						code: "220403",
						name: "西安区"
					}, {
						code: "220421",
						name: "东丰县"
					}, {
						code: "220422",
						name: "东辽县"
					}]
				}, {
					code: "220500",
					name: "通化市",
					children: [{
						code: "220501",
						name: "市辖区"
					}, {
						code: "220502",
						name: "东昌区"
					}, {
						code: "220503",
						name: "二道江区"
					}, {
						code: "220521",
						name: "通化县"
					}, {
						code: "220523",
						name: "辉南县"
					}, {
						code: "220524",
						name: "柳河县"
					}, {
						code: "220581",
						name: "梅河口市"
					}, {
						code: "220582",
						name: "集安市"
					}]
				}, {
					code: "220600",
					name: "白山市",
					children: [{
						code: "220601",
						name: "市辖区"
					}, {
						code: "220602",
						name: "浑江区"
					}, {
						code: "220605",
						name: "江源区"
					}, {
						code: "220621",
						name: "抚松县"
					}, {
						code: "220622",
						name: "靖宇县"
					}, {
						code: "220623",
						name: "长白朝鲜族自治县"
					}, {
						code: "220681",
						name: "临江市"
					}]
				}, {
					code: "220700",
					name: "松原市",
					children: [{
						code: "220701",
						name: "市辖区"
					}, {
						code: "220702",
						name: "宁江区"
					}, {
						code: "220721",
						name: "前郭尔罗斯蒙古族自治县"
					}, {
						code: "220722",
						name: "长岭县"
					}, {
						code: "220723",
						name: "乾安县"
					}, {
						code: "220781",
						name: "扶余市"
					}]
				}, {
					code: "220800",
					name: "白城市",
					children: [{
						code: "220801",
						name: "市辖区"
					}, {
						code: "220802",
						name: "洮北区"
					}, {
						code: "220821",
						name: "镇赉县"
					}, {
						code: "220822",
						name: "通榆县"
					}, {
						code: "220881",
						name: "洮南市"
					}, {
						code: "220882",
						name: "大安市"
					}]
				}, {
					code: "222400",
					name: "延边朝鲜族自治州",
					children: [{
						code: "222401",
						name: "延吉市"
					}, {
						code: "222402",
						name: "图们市"
					}, {
						code: "222403",
						name: "敦化市"
					}, {
						code: "222404",
						name: "珲春市"
					}, {
						code: "222405",
						name: "龙井市"
					}, {
						code: "222406",
						name: "和龙市"
					}, {
						code: "222424",
						name: "汪清县"
					}, {
						code: "222426",
						name: "安图县"
					}]
				}]
			}, {
				code: "230000",
				name: "黑龙江省",
				children: [{
					code: "230100",
					name: "哈尔滨市",
					children: [{
						code: "230101",
						name: "市辖区"
					}, {
						code: "230102",
						name: "道里区"
					}, {
						code: "230103",
						name: "南岗区"
					}, {
						code: "230104",
						name: "道外区"
					}, {
						code: "230108",
						name: "平房区"
					}, {
						code: "230109",
						name: "松北区"
					}, {
						code: "230110",
						name: "香坊区"
					}, {
						code: "230111",
						name: "呼兰区"
					}, {
						code: "230112",
						name: "阿城区"
					}, {
						code: "230113",
						name: "双城区"
					}, {
						code: "230123",
						name: "依兰县"
					}, {
						code: "230124",
						name: "方正县"
					}, {
						code: "230125",
						name: "宾县"
					}, {
						code: "230126",
						name: "巴彦县"
					}, {
						code: "230127",
						name: "木兰县"
					}, {
						code: "230128",
						name: "通河县"
					}, {
						code: "230129",
						name: "延寿县"
					}, {
						code: "230183",
						name: "尚志市"
					}, {
						code: "230184",
						name: "五常市"
					}]
				}, {
					code: "230200",
					name: "齐齐哈尔市",
					children: [{
						code: "230201",
						name: "市辖区"
					}, {
						code: "230202",
						name: "龙沙区"
					}, {
						code: "230203",
						name: "建华区"
					}, {
						code: "230204",
						name: "铁锋区"
					}, {
						code: "230205",
						name: "昂昂溪区"
					}, {
						code: "230206",
						name: "富拉尔基区"
					}, {
						code: "230207",
						name: "碾子山区"
					}, {
						code: "230208",
						name: "梅里斯达斡尔族区"
					}, {
						code: "230221",
						name: "龙江县"
					}, {
						code: "230223",
						name: "依安县"
					}, {
						code: "230224",
						name: "泰来县"
					}, {
						code: "230225",
						name: "甘南县"
					}, {
						code: "230227",
						name: "富裕县"
					}, {
						code: "230229",
						name: "克山县"
					}, {
						code: "230230",
						name: "克东县"
					}, {
						code: "230231",
						name: "拜泉县"
					}, {
						code: "230281",
						name: "讷河市"
					}]
				}, {
					code: "230300",
					name: "鸡西市",
					children: [{
						code: "230301",
						name: "市辖区"
					}, {
						code: "230302",
						name: "鸡冠区"
					}, {
						code: "230303",
						name: "恒山区"
					}, {
						code: "230304",
						name: "滴道区"
					}, {
						code: "230305",
						name: "梨树区"
					}, {
						code: "230306",
						name: "城子河区"
					}, {
						code: "230307",
						name: "麻山区"
					}, {
						code: "230321",
						name: "鸡东县"
					}, {
						code: "230381",
						name: "虎林市"
					}, {
						code: "230382",
						name: "密山市"
					}]
				}, {
					code: "230400",
					name: "鹤岗市",
					children: [{
						code: "230401",
						name: "市辖区"
					}, {
						code: "230402",
						name: "向阳区"
					}, {
						code: "230403",
						name: "工农区"
					}, {
						code: "230404",
						name: "南山区"
					}, {
						code: "230405",
						name: "兴安区"
					}, {
						code: "230406",
						name: "东山区"
					}, {
						code: "230407",
						name: "兴山区"
					}, {
						code: "230421",
						name: "萝北县"
					}, {
						code: "230422",
						name: "绥滨县"
					}]
				}, {
					code: "230500",
					name: "双鸭山市",
					children: [{
						code: "230501",
						name: "市辖区"
					}, {
						code: "230502",
						name: "尖山区"
					}, {
						code: "230503",
						name: "岭东区"
					}, {
						code: "230505",
						name: "四方台区"
					}, {
						code: "230506",
						name: "宝山区"
					}, {
						code: "230521",
						name: "集贤县"
					}, {
						code: "230522",
						name: "友谊县"
					}, {
						code: "230523",
						name: "宝清县"
					}, {
						code: "230524",
						name: "饶河县"
					}]
				}, {
					code: "230600",
					name: "大庆市",
					children: [{
						code: "230601",
						name: "市辖区"
					}, {
						code: "230602",
						name: "萨尔图区"
					}, {
						code: "230603",
						name: "龙凤区"
					}, {
						code: "230604",
						name: "让胡路区"
					}, {
						code: "230605",
						name: "红岗区"
					}, {
						code: "230606",
						name: "大同区"
					}, {
						code: "230621",
						name: "肇州县"
					}, {
						code: "230622",
						name: "肇源县"
					}, {
						code: "230623",
						name: "林甸县"
					}, {
						code: "230624",
						name: "杜尔伯特蒙古族自治县"
					}]
				}, {
					code: "230700",
					name: "伊春市",
					children: [{
						code: "230701",
						name: "市辖区"
					}, {
						code: "230702",
						name: "伊春区"
					}, {
						code: "230703",
						name: "南岔区"
					}, {
						code: "230704",
						name: "友好区"
					}, {
						code: "230705",
						name: "西林区"
					}, {
						code: "230706",
						name: "翠峦区"
					}, {
						code: "230707",
						name: "新青区"
					}, {
						code: "230708",
						name: "美溪区"
					}, {
						code: "230709",
						name: "金山屯区"
					}, {
						code: "230710",
						name: "五营区"
					}, {
						code: "230711",
						name: "乌马河区"
					}, {
						code: "230712",
						name: "汤旺河区"
					}, {
						code: "230713",
						name: "带岭区"
					}, {
						code: "230714",
						name: "乌伊岭区"
					}, {
						code: "230715",
						name: "红星区"
					}, {
						code: "230716",
						name: "上甘岭区"
					}, {
						code: "230722",
						name: "嘉荫县"
					}, {
						code: "230781",
						name: "铁力市"
					}]
				}, {
					code: "230800",
					name: "佳木斯市",
					children: [{
						code: "230801",
						name: "市辖区"
					}, {
						code: "230803",
						name: "向阳区"
					}, {
						code: "230804",
						name: "前进区"
					}, {
						code: "230805",
						name: "东风区"
					}, {
						code: "230811",
						name: "郊区"
					}, {
						code: "230822",
						name: "桦南县"
					}, {
						code: "230826",
						name: "桦川县"
					}, {
						code: "230828",
						name: "汤原县"
					}, {
						code: "230881",
						name: "同江市"
					}, {
						code: "230882",
						name: "富锦市"
					}, {
						code: "230883",
						name: "抚远市"
					}]
				}, {
					code: "230900",
					name: "七台河市",
					children: [{
						code: "230901",
						name: "市辖区"
					}, {
						code: "230902",
						name: "新兴区"
					}, {
						code: "230903",
						name: "桃山区"
					}, {
						code: "230904",
						name: "茄子河区"
					}, {
						code: "230921",
						name: "勃利县"
					}]
				}, {
					code: "231000",
					name: "牡丹江市",
					children: [{
						code: "231001",
						name: "市辖区"
					}, {
						code: "231002",
						name: "东安区"
					}, {
						code: "231003",
						name: "阳明区"
					}, {
						code: "231004",
						name: "爱民区"
					}, {
						code: "231005",
						name: "西安区"
					}, {
						code: "231025",
						name: "林口县"
					}, {
						code: "231081",
						name: "绥芬河市"
					}, {
						code: "231083",
						name: "海林市"
					}, {
						code: "231084",
						name: "宁安市"
					}, {
						code: "231085",
						name: "穆棱市"
					}, {
						code: "231086",
						name: "东宁市"
					}]
				}, {
					code: "231100",
					name: "黑河市",
					children: [{
						code: "231101",
						name: "市辖区"
					}, {
						code: "231102",
						name: "爱辉区"
					}, {
						code: "231121",
						name: "嫩江县"
					}, {
						code: "231123",
						name: "逊克县"
					}, {
						code: "231124",
						name: "孙吴县"
					}, {
						code: "231181",
						name: "北安市"
					}, {
						code: "231182",
						name: "五大连池市"
					}]
				}, {
					code: "231200",
					name: "绥化市",
					children: [{
						code: "231201",
						name: "市辖区"
					}, {
						code: "231202",
						name: "北林区"
					}, {
						code: "231221",
						name: "望奎县"
					}, {
						code: "231222",
						name: "兰西县"
					}, {
						code: "231223",
						name: "青冈县"
					}, {
						code: "231224",
						name: "庆安县"
					}, {
						code: "231225",
						name: "明水县"
					}, {
						code: "231226",
						name: "绥棱县"
					}, {
						code: "231281",
						name: "安达市"
					}, {
						code: "231282",
						name: "肇东市"
					}, {
						code: "231283",
						name: "海伦市"
					}]
				}, {
					code: "232700",
					name: "大兴安岭地区",
					children: [{
						code: "232721",
						name: "呼玛县"
					}, {
						code: "232722",
						name: "塔河县"
					}, {
						code: "232723",
						name: "漠河县"
					}]
				}]
			}, {
				code: "310000",
				name: "上海市",
				children: [{
					code: "310100",
					name: "市辖区",
					children: [{
						code: "310101",
						name: "黄浦区"
					}, {
						code: "310104",
						name: "徐汇区"
					}, {
						code: "310105",
						name: "长宁区"
					}, {
						code: "310106",
						name: "静安区"
					}, {
						code: "310107",
						name: "普陀区"
					}, {
						code: "310109",
						name: "虹口区"
					}, {
						code: "310110",
						name: "杨浦区"
					}, {
						code: "310112",
						name: "闵行区"
					}, {
						code: "310113",
						name: "宝山区"
					}, {
						code: "310114",
						name: "嘉定区"
					}, {
						code: "310115",
						name: "浦东新区"
					}, {
						code: "310116",
						name: "金山区"
					}, {
						code: "310117",
						name: "松江区"
					}, {
						code: "310118",
						name: "青浦区"
					}, {
						code: "310120",
						name: "奉贤区"
					}, {
						code: "310151",
						name: "崇明区"
					}]
				}]
			}, {
				code: "320000",
				name: "江苏省",
				children: [{
					code: "320100",
					name: "南京市",
					children: [{
						code: "320101",
						name: "市辖区"
					}, {
						code: "320102",
						name: "玄武区"
					}, {
						code: "320104",
						name: "秦淮区"
					}, {
						code: "320105",
						name: "建邺区"
					}, {
						code: "320106",
						name: "鼓楼区"
					}, {
						code: "320111",
						name: "浦口区"
					}, {
						code: "320113",
						name: "栖霞区"
					}, {
						code: "320114",
						name: "雨花台区"
					}, {
						code: "320115",
						name: "江宁区"
					}, {
						code: "320116",
						name: "六合区"
					}, {
						code: "320117",
						name: "溧水区"
					}, {
						code: "320118",
						name: "高淳区"
					}]
				}, {
					code: "320200",
					name: "无锡市",
					children: [{
						code: "320201",
						name: "市辖区"
					}, {
						code: "320205",
						name: "锡山区"
					}, {
						code: "320206",
						name: "惠山区"
					}, {
						code: "320211",
						name: "滨湖区"
					}, {
						code: "320213",
						name: "梁溪区"
					}, {
						code: "320214",
						name: "新吴区"
					}, {
						code: "320281",
						name: "江阴市"
					}, {
						code: "320282",
						name: "宜兴市"
					}]
				}, {
					code: "320300",
					name: "徐州市",
					children: [{
						code: "320301",
						name: "市辖区"
					}, {
						code: "320302",
						name: "鼓楼区"
					}, {
						code: "320303",
						name: "云龙区"
					}, {
						code: "320305",
						name: "贾汪区"
					}, {
						code: "320311",
						name: "泉山区"
					}, {
						code: "320312",
						name: "铜山区"
					}, {
						code: "320321",
						name: "丰县"
					}, {
						code: "320322",
						name: "沛县"
					}, {
						code: "320324",
						name: "睢宁县"
					}, {
						code: "320381",
						name: "新沂市"
					}, {
						code: "320382",
						name: "邳州市"
					}]
				}, {
					code: "320400",
					name: "常州市",
					children: [{
						code: "320401",
						name: "市辖区"
					}, {
						code: "320402",
						name: "天宁区"
					}, {
						code: "320404",
						name: "钟楼区"
					}, {
						code: "320411",
						name: "新北区"
					}, {
						code: "320412",
						name: "武进区"
					}, {
						code: "320413",
						name: "金坛区"
					}, {
						code: "320481",
						name: "溧阳市"
					}]
				}, {
					code: "320500",
					name: "苏州市",
					children: [{
						code: "320501",
						name: "市辖区"
					}, {
						code: "320505",
						name: "虎丘区"
					}, {
						code: "320506",
						name: "吴中区"
					}, {
						code: "320507",
						name: "相城区"
					}, {
						code: "320508",
						name: "姑苏区"
					}, {
						code: "320509",
						name: "吴江区"
					}, {
						code: "320581",
						name: "常熟市"
					}, {
						code: "320582",
						name: "张家港市"
					}, {
						code: "320583",
						name: "昆山市"
					}, {
						code: "320585",
						name: "太仓市"
					}]
				}, {
					code: "320600",
					name: "南通市",
					children: [{
						code: "320601",
						name: "市辖区"
					}, {
						code: "320602",
						name: "崇川区"
					}, {
						code: "320611",
						name: "港闸区"
					}, {
						code: "320612",
						name: "通州区"
					}, {
						code: "320621",
						name: "海安县"
					}, {
						code: "320623",
						name: "如东县"
					}, {
						code: "320681",
						name: "启东市"
					}, {
						code: "320682",
						name: "如皋市"
					}, {
						code: "320684",
						name: "海门市"
					}]
				}, {
					code: "320700",
					name: "连云港市",
					children: [{
						code: "320701",
						name: "市辖区"
					}, {
						code: "320703",
						name: "连云区"
					}, {
						code: "320706",
						name: "海州区"
					}, {
						code: "320707",
						name: "赣榆区"
					}, {
						code: "320722",
						name: "东海县"
					}, {
						code: "320723",
						name: "灌云县"
					}, {
						code: "320724",
						name: "灌南县"
					}]
				}, {
					code: "320800",
					name: "淮安市",
					children: [{
						code: "320801",
						name: "市辖区"
					}, {
						code: "320803",
						name: "淮安区"
					}, {
						code: "320804",
						name: "淮阴区"
					}, {
						code: "320812",
						name: "清江浦区"
					}, {
						code: "320813",
						name: "洪泽区"
					}, {
						code: "320826",
						name: "涟水县"
					}, {
						code: "320830",
						name: "盱眙县"
					}, {
						code: "320831",
						name: "金湖县"
					}]
				}, {
					code: "320900",
					name: "盐城市",
					children: [{
						code: "320901",
						name: "市辖区"
					}, {
						code: "320902",
						name: "亭湖区"
					}, {
						code: "320903",
						name: "盐都区"
					}, {
						code: "320904",
						name: "大丰区"
					}, {
						code: "320921",
						name: "响水县"
					}, {
						code: "320922",
						name: "滨海县"
					}, {
						code: "320923",
						name: "阜宁县"
					}, {
						code: "320924",
						name: "射阳县"
					}, {
						code: "320925",
						name: "建湖县"
					}, {
						code: "320981",
						name: "东台市"
					}]
				}, {
					code: "321000",
					name: "扬州市",
					children: [{
						code: "321001",
						name: "市辖区"
					}, {
						code: "321002",
						name: "广陵区"
					}, {
						code: "321003",
						name: "邗江区"
					}, {
						code: "321012",
						name: "江都区"
					}, {
						code: "321023",
						name: "宝应县"
					}, {
						code: "321081",
						name: "仪征市"
					}, {
						code: "321084",
						name: "高邮市"
					}]
				}, {
					code: "321100",
					name: "镇江市",
					children: [{
						code: "321101",
						name: "市辖区"
					}, {
						code: "321102",
						name: "京口区"
					}, {
						code: "321111",
						name: "润州区"
					}, {
						code: "321112",
						name: "丹徒区"
					}, {
						code: "321181",
						name: "丹阳市"
					}, {
						code: "321182",
						name: "扬中市"
					}, {
						code: "321183",
						name: "句容市"
					}]
				}, {
					code: "321200",
					name: "泰州市",
					children: [{
						code: "321201",
						name: "市辖区"
					}, {
						code: "321202",
						name: "海陵区"
					}, {
						code: "321203",
						name: "高港区"
					}, {
						code: "321204",
						name: "姜堰区"
					}, {
						code: "321281",
						name: "兴化市"
					}, {
						code: "321282",
						name: "靖江市"
					}, {
						code: "321283",
						name: "泰兴市"
					}]
				}, {
					code: "321300",
					name: "宿迁市",
					children: [{
						code: "321301",
						name: "市辖区"
					}, {
						code: "321302",
						name: "宿城区"
					}, {
						code: "321311",
						name: "宿豫区"
					}, {
						code: "321322",
						name: "沭阳县"
					}, {
						code: "321323",
						name: "泗阳县"
					}, {
						code: "321324",
						name: "泗洪县"
					}]
				}]
			}, {
				code: "330000",
				name: "浙江省",
				children: [{
					code: "330100",
					name: "杭州市",
					children: [{
						code: "330101",
						name: "市辖区"
					}, {
						code: "330102",
						name: "上城区"
					}, {
						code: "330103",
						name: "下城区"
					}, {
						code: "330104",
						name: "江干区"
					}, {
						code: "330105",
						name: "拱墅区"
					}, {
						code: "330106",
						name: "西湖区"
					}, {
						code: "330108",
						name: "滨江区"
					}, {
						code: "330109",
						name: "萧山区"
					}, {
						code: "330110",
						name: "余杭区"
					}, {
						code: "330111",
						name: "富阳区"
					}, {
						code: "330122",
						name: "桐庐县"
					}, {
						code: "330127",
						name: "淳安县"
					}, {
						code: "330182",
						name: "建德市"
					}, {
						code: "330185",
						name: "临安市"
					}]
				}, {
					code: "330200",
					name: "宁波市",
					children: [{
						code: "330201",
						name: "市辖区"
					}, {
						code: "330203",
						name: "海曙区"
					}, {
						code: "330204",
						name: "江东区"
					}, {
						code: "330205",
						name: "江北区"
					}, {
						code: "330206",
						name: "北仑区"
					}, {
						code: "330211",
						name: "镇海区"
					}, {
						code: "330212",
						name: "鄞州区"
					}, {
						code: "330225",
						name: "象山县"
					}, {
						code: "330226",
						name: "宁海县"
					}, {
						code: "330281",
						name: "余姚市"
					}, {
						code: "330282",
						name: "慈溪市"
					}, {
						code: "330283",
						name: "奉化市"
					}]
				}, {
					code: "330300",
					name: "温州市",
					children: [{
						code: "330301",
						name: "市辖区"
					}, {
						code: "330302",
						name: "鹿城区"
					}, {
						code: "330303",
						name: "龙湾区"
					}, {
						code: "330304",
						name: "瓯海区"
					}, {
						code: "330305",
						name: "洞头区"
					}, {
						code: "330324",
						name: "永嘉县"
					}, {
						code: "330326",
						name: "平阳县"
					}, {
						code: "330327",
						name: "苍南县"
					}, {
						code: "330328",
						name: "文成县"
					}, {
						code: "330329",
						name: "泰顺县"
					}, {
						code: "330381",
						name: "瑞安市"
					}, {
						code: "330382",
						name: "乐清市"
					}]
				}, {
					code: "330400",
					name: "嘉兴市",
					children: [{
						code: "330401",
						name: "市辖区"
					}, {
						code: "330402",
						name: "南湖区"
					}, {
						code: "330411",
						name: "秀洲区"
					}, {
						code: "330421",
						name: "嘉善县"
					}, {
						code: "330424",
						name: "海盐县"
					}, {
						code: "330481",
						name: "海宁市"
					}, {
						code: "330482",
						name: "平湖市"
					}, {
						code: "330483",
						name: "桐乡市"
					}]
				}, {
					code: "330500",
					name: "湖州市",
					children: [{
						code: "330501",
						name: "市辖区"
					}, {
						code: "330502",
						name: "吴兴区"
					}, {
						code: "330503",
						name: "南浔区"
					}, {
						code: "330521",
						name: "德清县"
					}, {
						code: "330522",
						name: "长兴县"
					}, {
						code: "330523",
						name: "安吉县"
					}]
				}, {
					code: "330600",
					name: "绍兴市",
					children: [{
						code: "330601",
						name: "市辖区"
					}, {
						code: "330602",
						name: "越城区"
					}, {
						code: "330603",
						name: "柯桥区"
					}, {
						code: "330604",
						name: "上虞区"
					}, {
						code: "330624",
						name: "新昌县"
					}, {
						code: "330681",
						name: "诸暨市"
					}, {
						code: "330683",
						name: "嵊州市"
					}]
				}, {
					code: "330700",
					name: "金华市",
					children: [{
						code: "330701",
						name: "市辖区"
					}, {
						code: "330702",
						name: "婺城区"
					}, {
						code: "330703",
						name: "金东区"
					}, {
						code: "330723",
						name: "武义县"
					}, {
						code: "330726",
						name: "浦江县"
					}, {
						code: "330727",
						name: "磐安县"
					}, {
						code: "330781",
						name: "兰溪市"
					}, {
						code: "330782",
						name: "义乌市"
					}, {
						code: "330783",
						name: "东阳市"
					}, {
						code: "330784",
						name: "永康市"
					}]
				}, {
					code: "330800",
					name: "衢州市",
					children: [{
						code: "330801",
						name: "市辖区"
					}, {
						code: "330802",
						name: "柯城区"
					}, {
						code: "330803",
						name: "衢江区"
					}, {
						code: "330822",
						name: "常山县"
					}, {
						code: "330824",
						name: "开化县"
					}, {
						code: "330825",
						name: "龙游县"
					}, {
						code: "330881",
						name: "江山市"
					}]
				}, {
					code: "330900",
					name: "舟山市",
					children: [{
						code: "330901",
						name: "市辖区"
					}, {
						code: "330902",
						name: "定海区"
					}, {
						code: "330903",
						name: "普陀区"
					}, {
						code: "330921",
						name: "岱山县"
					}, {
						code: "330922",
						name: "嵊泗县"
					}]
				}, {
					code: "331000",
					name: "台州市",
					children: [{
						code: "331001",
						name: "市辖区"
					}, {
						code: "331002",
						name: "椒江区"
					}, {
						code: "331003",
						name: "黄岩区"
					}, {
						code: "331004",
						name: "路桥区"
					}, {
						code: "331021",
						name: "玉环县"
					}, {
						code: "331022",
						name: "三门县"
					}, {
						code: "331023",
						name: "天台县"
					}, {
						code: "331024",
						name: "仙居县"
					}, {
						code: "331081",
						name: "温岭市"
					}, {
						code: "331082",
						name: "临海市"
					}]
				}, {
					code: "331100",
					name: "丽水市",
					children: [{
						code: "331101",
						name: "市辖区"
					}, {
						code: "331102",
						name: "莲都区"
					}, {
						code: "331121",
						name: "青田县"
					}, {
						code: "331122",
						name: "缙云县"
					}, {
						code: "331123",
						name: "遂昌县"
					}, {
						code: "331124",
						name: "松阳县"
					}, {
						code: "331125",
						name: "云和县"
					}, {
						code: "331126",
						name: "庆元县"
					}, {
						code: "331127",
						name: "景宁畲族自治县"
					}, {
						code: "331181",
						name: "龙泉市"
					}]
				}]
			}, {
				code: "340000",
				name: "安徽省",
				children: [{
					code: "340100",
					name: "合肥市",
					children: [{
						code: "340101",
						name: "市辖区"
					}, {
						code: "340102",
						name: "瑶海区"
					}, {
						code: "340103",
						name: "庐阳区"
					}, {
						code: "340104",
						name: "蜀山区"
					}, {
						code: "340111",
						name: "包河区"
					}, {
						code: "340121",
						name: "长丰县"
					}, {
						code: "340122",
						name: "肥东县"
					}, {
						code: "340123",
						name: "肥西县"
					}, {
						code: "340124",
						name: "庐江县"
					}, {
						code: "340181",
						name: "巢湖市"
					}]
				}, {
					code: "340200",
					name: "芜湖市",
					children: [{
						code: "340201",
						name: "市辖区"
					}, {
						code: "340202",
						name: "镜湖区"
					}, {
						code: "340203",
						name: "弋江区"
					}, {
						code: "340207",
						name: "鸠江区"
					}, {
						code: "340208",
						name: "三山区"
					}, {
						code: "340221",
						name: "芜湖县"
					}, {
						code: "340222",
						name: "繁昌县"
					}, {
						code: "340223",
						name: "南陵县"
					}, {
						code: "340225",
						name: "无为县"
					}]
				}, {
					code: "340300",
					name: "蚌埠市",
					children: [{
						code: "340301",
						name: "市辖区"
					}, {
						code: "340302",
						name: "龙子湖区"
					}, {
						code: "340303",
						name: "蚌山区"
					}, {
						code: "340304",
						name: "禹会区"
					}, {
						code: "340311",
						name: "淮上区"
					}, {
						code: "340321",
						name: "怀远县"
					}, {
						code: "340322",
						name: "五河县"
					}, {
						code: "340323",
						name: "固镇县"
					}]
				}, {
					code: "340400",
					name: "淮南市",
					children: [{
						code: "340401",
						name: "市辖区"
					}, {
						code: "340402",
						name: "大通区"
					}, {
						code: "340403",
						name: "田家庵区"
					}, {
						code: "340404",
						name: "谢家集区"
					}, {
						code: "340405",
						name: "八公山区"
					}, {
						code: "340406",
						name: "潘集区"
					}, {
						code: "340421",
						name: "凤台县"
					}, {
						code: "340422",
						name: "寿县"
					}]
				}, {
					code: "340500",
					name: "马鞍山市",
					children: [{
						code: "340501",
						name: "市辖区"
					}, {
						code: "340503",
						name: "花山区"
					}, {
						code: "340504",
						name: "雨山区"
					}, {
						code: "340506",
						name: "博望区"
					}, {
						code: "340521",
						name: "当涂县"
					}, {
						code: "340522",
						name: "含山县"
					}, {
						code: "340523",
						name: "和县"
					}]
				}, {
					code: "340600",
					name: "淮北市",
					children: [{
						code: "340601",
						name: "市辖区"
					}, {
						code: "340602",
						name: "杜集区"
					}, {
						code: "340603",
						name: "相山区"
					}, {
						code: "340604",
						name: "烈山区"
					}, {
						code: "340621",
						name: "濉溪县"
					}]
				}, {
					code: "340700",
					name: "铜陵市",
					children: [{
						code: "340701",
						name: "市辖区"
					}, {
						code: "340705",
						name: "铜官区"
					}, {
						code: "340706",
						name: "义安区"
					}, {
						code: "340711",
						name: "郊区"
					}, {
						code: "340722",
						name: "枞阳县"
					}]
				}, {
					code: "340800",
					name: "安庆市",
					children: [{
						code: "340801",
						name: "市辖区"
					}, {
						code: "340802",
						name: "迎江区"
					}, {
						code: "340803",
						name: "大观区"
					}, {
						code: "340811",
						name: "宜秀区"
					}, {
						code: "340822",
						name: "怀宁县"
					}, {
						code: "340824",
						name: "潜山县"
					}, {
						code: "340825",
						name: "太湖县"
					}, {
						code: "340826",
						name: "宿松县"
					}, {
						code: "340827",
						name: "望江县"
					}, {
						code: "340828",
						name: "岳西县"
					}, {
						code: "340881",
						name: "桐城市"
					}]
				}, {
					code: "341000",
					name: "黄山市",
					children: [{
						code: "341001",
						name: "市辖区"
					}, {
						code: "341002",
						name: "屯溪区"
					}, {
						code: "341003",
						name: "黄山区"
					}, {
						code: "341004",
						name: "徽州区"
					}, {
						code: "341021",
						name: "歙县"
					}, {
						code: "341022",
						name: "休宁县"
					}, {
						code: "341023",
						name: "黟县"
					}, {
						code: "341024",
						name: "祁门县"
					}]
				}, {
					code: "341100",
					name: "滁州市",
					children: [{
						code: "341101",
						name: "市辖区"
					}, {
						code: "341102",
						name: "琅琊区"
					}, {
						code: "341103",
						name: "南谯区"
					}, {
						code: "341122",
						name: "来安县"
					}, {
						code: "341124",
						name: "全椒县"
					}, {
						code: "341125",
						name: "定远县"
					}, {
						code: "341126",
						name: "凤阳县"
					}, {
						code: "341181",
						name: "天长市"
					}, {
						code: "341182",
						name: "明光市"
					}]
				}, {
					code: "341200",
					name: "阜阳市",
					children: [{
						code: "341201",
						name: "市辖区"
					}, {
						code: "341202",
						name: "颍州区"
					}, {
						code: "341203",
						name: "颍东区"
					}, {
						code: "341204",
						name: "颍泉区"
					}, {
						code: "341221",
						name: "临泉县"
					}, {
						code: "341222",
						name: "太和县"
					}, {
						code: "341225",
						name: "阜南县"
					}, {
						code: "341226",
						name: "颍上县"
					}, {
						code: "341282",
						name: "界首市"
					}]
				}, {
					code: "341300",
					name: "宿州市",
					children: [{
						code: "341301",
						name: "市辖区"
					}, {
						code: "341302",
						name: "埇桥区"
					}, {
						code: "341321",
						name: "砀山县"
					}, {
						code: "341322",
						name: "萧县"
					}, {
						code: "341323",
						name: "灵璧县"
					}, {
						code: "341324",
						name: "泗县"
					}]
				}, {
					code: "341500",
					name: "六安市",
					children: [{
						code: "341501",
						name: "市辖区"
					}, {
						code: "341502",
						name: "金安区"
					}, {
						code: "341503",
						name: "裕安区"
					}, {
						code: "341504",
						name: "叶集区"
					}, {
						code: "341522",
						name: "霍邱县"
					}, {
						code: "341523",
						name: "舒城县"
					}, {
						code: "341524",
						name: "金寨县"
					}, {
						code: "341525",
						name: "霍山县"
					}]
				}, {
					code: "341600",
					name: "亳州市",
					children: [{
						code: "341601",
						name: "市辖区"
					}, {
						code: "341602",
						name: "谯城区"
					}, {
						code: "341621",
						name: "涡阳县"
					}, {
						code: "341622",
						name: "蒙城县"
					}, {
						code: "341623",
						name: "利辛县"
					}]
				}, {
					code: "341700",
					name: "池州市",
					children: [{
						code: "341701",
						name: "市辖区"
					}, {
						code: "341702",
						name: "贵池区"
					}, {
						code: "341721",
						name: "东至县"
					}, {
						code: "341722",
						name: "石台县"
					}, {
						code: "341723",
						name: "青阳县"
					}]
				}, {
					code: "341800",
					name: "宣城市",
					children: [{
						code: "341801",
						name: "市辖区"
					}, {
						code: "341802",
						name: "宣州区"
					}, {
						code: "341821",
						name: "郎溪县"
					}, {
						code: "341822",
						name: "广德县"
					}, {
						code: "341823",
						name: "泾县"
					}, {
						code: "341824",
						name: "绩溪县"
					}, {
						code: "341825",
						name: "旌德县"
					}, {
						code: "341881",
						name: "宁国市"
					}]
				}]
			}, {
				code: "350000",
				name: "福建省",
				children: [{
					code: "350100",
					name: "福州市",
					children: [{
						code: "350101",
						name: "市辖区"
					}, {
						code: "350102",
						name: "鼓楼区"
					}, {
						code: "350103",
						name: "台江区"
					}, {
						code: "350104",
						name: "仓山区"
					}, {
						code: "350105",
						name: "马尾区"
					}, {
						code: "350111",
						name: "晋安区"
					}, {
						code: "350121",
						name: "闽侯县"
					}, {
						code: "350122",
						name: "连江县"
					}, {
						code: "350123",
						name: "罗源县"
					}, {
						code: "350124",
						name: "闽清县"
					}, {
						code: "350125",
						name: "永泰县"
					}, {
						code: "350128",
						name: "平潭县"
					}, {
						code: "350181",
						name: "福清市"
					}, {
						code: "350182",
						name: "长乐市"
					}]
				}, {
					code: "350200",
					name: "厦门市",
					children: [{
						code: "350201",
						name: "市辖区"
					}, {
						code: "350203",
						name: "思明区"
					}, {
						code: "350205",
						name: "海沧区"
					}, {
						code: "350206",
						name: "湖里区"
					}, {
						code: "350211",
						name: "集美区"
					}, {
						code: "350212",
						name: "同安区"
					}, {
						code: "350213",
						name: "翔安区"
					}]
				}, {
					code: "350300",
					name: "莆田市",
					children: [{
						code: "350301",
						name: "市辖区"
					}, {
						code: "350302",
						name: "城厢区"
					}, {
						code: "350303",
						name: "涵江区"
					}, {
						code: "350304",
						name: "荔城区"
					}, {
						code: "350305",
						name: "秀屿区"
					}, {
						code: "350322",
						name: "仙游县"
					}]
				}, {
					code: "350400",
					name: "三明市",
					children: [{
						code: "350401",
						name: "市辖区"
					}, {
						code: "350402",
						name: "梅列区"
					}, {
						code: "350403",
						name: "三元区"
					}, {
						code: "350421",
						name: "明溪县"
					}, {
						code: "350423",
						name: "清流县"
					}, {
						code: "350424",
						name: "宁化县"
					}, {
						code: "350425",
						name: "大田县"
					}, {
						code: "350426",
						name: "尤溪县"
					}, {
						code: "350427",
						name: "沙县"
					}, {
						code: "350428",
						name: "将乐县"
					}, {
						code: "350429",
						name: "泰宁县"
					}, {
						code: "350430",
						name: "建宁县"
					}, {
						code: "350481",
						name: "永安市"
					}]
				}, {
					code: "350500",
					name: "泉州市",
					children: [{
						code: "350501",
						name: "市辖区"
					}, {
						code: "350502",
						name: "鲤城区"
					}, {
						code: "350503",
						name: "丰泽区"
					}, {
						code: "350504",
						name: "洛江区"
					}, {
						code: "350505",
						name: "泉港区"
					}, {
						code: "350521",
						name: "惠安县"
					}, {
						code: "350524",
						name: "安溪县"
					}, {
						code: "350525",
						name: "永春县"
					}, {
						code: "350526",
						name: "德化县"
					}, {
						code: "350527",
						name: "金门县"
					}, {
						code: "350581",
						name: "石狮市"
					}, {
						code: "350582",
						name: "晋江市"
					}, {
						code: "350583",
						name: "南安市"
					}]
				}, {
					code: "350600",
					name: "漳州市",
					children: [{
						code: "350601",
						name: "市辖区"
					}, {
						code: "350602",
						name: "芗城区"
					}, {
						code: "350603",
						name: "龙文区"
					}, {
						code: "350622",
						name: "云霄县"
					}, {
						code: "350623",
						name: "漳浦县"
					}, {
						code: "350624",
						name: "诏安县"
					}, {
						code: "350625",
						name: "长泰县"
					}, {
						code: "350626",
						name: "东山县"
					}, {
						code: "350627",
						name: "南靖县"
					}, {
						code: "350628",
						name: "平和县"
					}, {
						code: "350629",
						name: "华安县"
					}, {
						code: "350681",
						name: "龙海市"
					}]
				}, {
					code: "350700",
					name: "南平市",
					children: [{
						code: "350701",
						name: "市辖区"
					}, {
						code: "350702",
						name: "延平区"
					}, {
						code: "350703",
						name: "建阳区"
					}, {
						code: "350721",
						name: "顺昌县"
					}, {
						code: "350722",
						name: "浦城县"
					}, {
						code: "350723",
						name: "光泽县"
					}, {
						code: "350724",
						name: "松溪县"
					}, {
						code: "350725",
						name: "政和县"
					}, {
						code: "350781",
						name: "邵武市"
					}, {
						code: "350782",
						name: "武夷山市"
					}, {
						code: "350783",
						name: "建瓯市"
					}]
				}, {
					code: "350800",
					name: "龙岩市",
					children: [{
						code: "350801",
						name: "市辖区"
					}, {
						code: "350802",
						name: "新罗区"
					}, {
						code: "350803",
						name: "永定区"
					}, {
						code: "350821",
						name: "长汀县"
					}, {
						code: "350823",
						name: "上杭县"
					}, {
						code: "350824",
						name: "武平县"
					}, {
						code: "350825",
						name: "连城县"
					}, {
						code: "350881",
						name: "漳平市"
					}]
				}, {
					code: "350900",
					name: "宁德市",
					children: [{
						code: "350901",
						name: "市辖区"
					}, {
						code: "350902",
						name: "蕉城区"
					}, {
						code: "350921",
						name: "霞浦县"
					}, {
						code: "350922",
						name: "古田县"
					}, {
						code: "350923",
						name: "屏南县"
					}, {
						code: "350924",
						name: "寿宁县"
					}, {
						code: "350925",
						name: "周宁县"
					}, {
						code: "350926",
						name: "柘荣县"
					}, {
						code: "350981",
						name: "福安市"
					}, {
						code: "350982",
						name: "福鼎市"
					}]
				}]
			}, {
				code: "360000",
				name: "江西省",
				children: [{
					code: "360100",
					name: "南昌市",
					children: [{
						code: "360101",
						name: "市辖区"
					}, {
						code: "360102",
						name: "东湖区"
					}, {
						code: "360103",
						name: "西湖区"
					}, {
						code: "360104",
						name: "青云谱区"
					}, {
						code: "360105",
						name: "湾里区"
					}, {
						code: "360111",
						name: "青山湖区"
					}, {
						code: "360112",
						name: "新建区"
					}, {
						code: "360121",
						name: "南昌县"
					}, {
						code: "360123",
						name: "安义县"
					}, {
						code: "360124",
						name: "进贤县"
					}]
				}, {
					code: "360200",
					name: "景德镇市",
					children: [{
						code: "360201",
						name: "市辖区"
					}, {
						code: "360202",
						name: "昌江区"
					}, {
						code: "360203",
						name: "珠山区"
					}, {
						code: "360222",
						name: "浮梁县"
					}, {
						code: "360281",
						name: "乐平市"
					}]
				}, {
					code: "360300",
					name: "萍乡市",
					children: [{
						code: "360301",
						name: "市辖区"
					}, {
						code: "360302",
						name: "安源区"
					}, {
						code: "360313",
						name: "湘东区"
					}, {
						code: "360321",
						name: "莲花县"
					}, {
						code: "360322",
						name: "上栗县"
					}, {
						code: "360323",
						name: "芦溪县"
					}]
				}, {
					code: "360400",
					name: "九江市",
					children: [{
						code: "360401",
						name: "市辖区"
					}, {
						code: "360402",
						name: "濂溪区"
					}, {
						code: "360403",
						name: "浔阳区"
					}, {
						code: "360421",
						name: "九江县"
					}, {
						code: "360423",
						name: "武宁县"
					}, {
						code: "360424",
						name: "修水县"
					}, {
						code: "360425",
						name: "永修县"
					}, {
						code: "360426",
						name: "德安县"
					}, {
						code: "360428",
						name: "都昌县"
					}, {
						code: "360429",
						name: "湖口县"
					}, {
						code: "360430",
						name: "彭泽县"
					}, {
						code: "360481",
						name: "瑞昌市"
					}, {
						code: "360482",
						name: "共青城市"
					}, {
						code: "360483",
						name: "庐山市"
					}]
				}, {
					code: "360500",
					name: "新余市",
					children: [{
						code: "360501",
						name: "市辖区"
					}, {
						code: "360502",
						name: "渝水区"
					}, {
						code: "360521",
						name: "分宜县"
					}]
				}, {
					code: "360600",
					name: "鹰潭市",
					children: [{
						code: "360601",
						name: "市辖区"
					}, {
						code: "360602",
						name: "月湖区"
					}, {
						code: "360622",
						name: "余江县"
					}, {
						code: "360681",
						name: "贵溪市"
					}]
				}, {
					code: "360700",
					name: "赣州市",
					children: [{
						code: "360701",
						name: "市辖区"
					}, {
						code: "360702",
						name: "章贡区"
					}, {
						code: "360703",
						name: "南康区"
					}, {
						code: "360721",
						name: "赣县"
					}, {
						code: "360722",
						name: "信丰县"
					}, {
						code: "360723",
						name: "大余县"
					}, {
						code: "360724",
						name: "上犹县"
					}, {
						code: "360725",
						name: "崇义县"
					}, {
						code: "360726",
						name: "安远县"
					}, {
						code: "360727",
						name: "龙南县"
					}, {
						code: "360728",
						name: "定南县"
					}, {
						code: "360729",
						name: "全南县"
					}, {
						code: "360730",
						name: "宁都县"
					}, {
						code: "360731",
						name: "于都县"
					}, {
						code: "360732",
						name: "兴国县"
					}, {
						code: "360733",
						name: "会昌县"
					}, {
						code: "360734",
						name: "寻乌县"
					}, {
						code: "360735",
						name: "石城县"
					}, {
						code: "360781",
						name: "瑞金市"
					}]
				}, {
					code: "360800",
					name: "吉安市",
					children: [{
						code: "360801",
						name: "市辖区"
					}, {
						code: "360802",
						name: "吉州区"
					}, {
						code: "360803",
						name: "青原区"
					}, {
						code: "360821",
						name: "吉安县"
					}, {
						code: "360822",
						name: "吉水县"
					}, {
						code: "360823",
						name: "峡江县"
					}, {
						code: "360824",
						name: "新干县"
					}, {
						code: "360825",
						name: "永丰县"
					}, {
						code: "360826",
						name: "泰和县"
					}, {
						code: "360827",
						name: "遂川县"
					}, {
						code: "360828",
						name: "万安县"
					}, {
						code: "360829",
						name: "安福县"
					}, {
						code: "360830",
						name: "永新县"
					}, {
						code: "360881",
						name: "井冈山市"
					}]
				}, {
					code: "360900",
					name: "宜春市",
					children: [{
						code: "360901",
						name: "市辖区"
					}, {
						code: "360902",
						name: "袁州区"
					}, {
						code: "360921",
						name: "奉新县"
					}, {
						code: "360922",
						name: "万载县"
					}, {
						code: "360923",
						name: "上高县"
					}, {
						code: "360924",
						name: "宜丰县"
					}, {
						code: "360925",
						name: "靖安县"
					}, {
						code: "360926",
						name: "铜鼓县"
					}, {
						code: "360981",
						name: "丰城市"
					}, {
						code: "360982",
						name: "樟树市"
					}, {
						code: "360983",
						name: "高安市"
					}]
				}, {
					code: "361000",
					name: "抚州市",
					children: [{
						code: "361001",
						name: "市辖区"
					}, {
						code: "361002",
						name: "临川区"
					}, {
						code: "361021",
						name: "南城县"
					}, {
						code: "361022",
						name: "黎川县"
					}, {
						code: "361023",
						name: "南丰县"
					}, {
						code: "361024",
						name: "崇仁县"
					}, {
						code: "361025",
						name: "乐安县"
					}, {
						code: "361026",
						name: "宜黄县"
					}, {
						code: "361027",
						name: "金溪县"
					}, {
						code: "361028",
						name: "资溪县"
					}, {
						code: "361029",
						name: "东乡县"
					}, {
						code: "361030",
						name: "广昌县"
					}]
				}, {
					code: "361100",
					name: "上饶市",
					children: [{
						code: "361101",
						name: "市辖区"
					}, {
						code: "361102",
						name: "信州区"
					}, {
						code: "361103",
						name: "广丰区"
					}, {
						code: "361121",
						name: "上饶县"
					}, {
						code: "361123",
						name: "玉山县"
					}, {
						code: "361124",
						name: "铅山县"
					}, {
						code: "361125",
						name: "横峰县"
					}, {
						code: "361126",
						name: "弋阳县"
					}, {
						code: "361127",
						name: "余干县"
					}, {
						code: "361128",
						name: "鄱阳县"
					}, {
						code: "361129",
						name: "万年县"
					}, {
						code: "361130",
						name: "婺源县"
					}, {
						code: "361181",
						name: "德兴市"
					}]
				}]
			}, {
				code: "370000",
				name: "山东省",
				children: [{
					code: "370100",
					name: "济南市",
					children: [{
						code: "370101",
						name: "市辖区"
					}, {
						code: "370102",
						name: "历下区"
					}, {
						code: "370103",
						name: "市中区"
					}, {
						code: "370104",
						name: "槐荫区"
					}, {
						code: "370105",
						name: "天桥区"
					}, {
						code: "370112",
						name: "历城区"
					}, {
						code: "370113",
						name: "长清区"
					}, {
						code: "370124",
						name: "平阴县"
					}, {
						code: "370125",
						name: "济阳县"
					}, {
						code: "370126",
						name: "商河县"
					}, {
						code: "370181",
						name: "章丘市"
					}]
				}, {
					code: "370200",
					name: "青岛市",
					children: [{
						code: "370201",
						name: "市辖区"
					}, {
						code: "370202",
						name: "市南区"
					}, {
						code: "370203",
						name: "市北区"
					}, {
						code: "370211",
						name: "黄岛区"
					}, {
						code: "370212",
						name: "崂山区"
					}, {
						code: "370213",
						name: "李沧区"
					}, {
						code: "370214",
						name: "城阳区"
					}, {
						code: "370281",
						name: "胶州市"
					}, {
						code: "370282",
						name: "即墨市"
					}, {
						code: "370283",
						name: "平度市"
					}, {
						code: "370285",
						name: "莱西市"
					}]
				}, {
					code: "370300",
					name: "淄博市",
					children: [{
						code: "370301",
						name: "市辖区"
					}, {
						code: "370302",
						name: "淄川区"
					}, {
						code: "370303",
						name: "张店区"
					}, {
						code: "370304",
						name: "博山区"
					}, {
						code: "370305",
						name: "临淄区"
					}, {
						code: "370306",
						name: "周村区"
					}, {
						code: "370321",
						name: "桓台县"
					}, {
						code: "370322",
						name: "高青县"
					}, {
						code: "370323",
						name: "沂源县"
					}]
				}, {
					code: "370400",
					name: "枣庄市",
					children: [{
						code: "370401",
						name: "市辖区"
					}, {
						code: "370402",
						name: "市中区"
					}, {
						code: "370403",
						name: "薛城区"
					}, {
						code: "370404",
						name: "峄城区"
					}, {
						code: "370405",
						name: "台儿庄区"
					}, {
						code: "370406",
						name: "山亭区"
					}, {
						code: "370481",
						name: "滕州市"
					}]
				}, {
					code: "370500",
					name: "东营市",
					children: [{
						code: "370501",
						name: "市辖区"
					}, {
						code: "370502",
						name: "东营区"
					}, {
						code: "370503",
						name: "河口区"
					}, {
						code: "370505",
						name: "垦利区"
					}, {
						code: "370522",
						name: "利津县"
					}, {
						code: "370523",
						name: "广饶县"
					}]
				}, {
					code: "370600",
					name: "烟台市",
					children: [{
						code: "370601",
						name: "市辖区"
					}, {
						code: "370602",
						name: "芝罘区"
					}, {
						code: "370611",
						name: "福山区"
					}, {
						code: "370612",
						name: "牟平区"
					}, {
						code: "370613",
						name: "莱山区"
					}, {
						code: "370634",
						name: "长岛县"
					}, {
						code: "370681",
						name: "龙口市"
					}, {
						code: "370682",
						name: "莱阳市"
					}, {
						code: "370683",
						name: "莱州市"
					}, {
						code: "370684",
						name: "蓬莱市"
					}, {
						code: "370685",
						name: "招远市"
					}, {
						code: "370686",
						name: "栖霞市"
					}, {
						code: "370687",
						name: "海阳市"
					}]
				}, {
					code: "370700",
					name: "潍坊市",
					children: [{
						code: "370701",
						name: "市辖区"
					}, {
						code: "370702",
						name: "潍城区"
					}, {
						code: "370703",
						name: "寒亭区"
					}, {
						code: "370704",
						name: "坊子区"
					}, {
						code: "370705",
						name: "奎文区"
					}, {
						code: "370724",
						name: "临朐县"
					}, {
						code: "370725",
						name: "昌乐县"
					}, {
						code: "370781",
						name: "青州市"
					}, {
						code: "370782",
						name: "诸城市"
					}, {
						code: "370783",
						name: "寿光市"
					}, {
						code: "370784",
						name: "安丘市"
					}, {
						code: "370785",
						name: "高密市"
					}, {
						code: "370786",
						name: "昌邑市"
					}]
				}, {
					code: "370800",
					name: "济宁市",
					children: [{
						code: "370801",
						name: "市辖区"
					}, {
						code: "370811",
						name: "任城区"
					}, {
						code: "370812",
						name: "兖州区"
					}, {
						code: "370826",
						name: "微山县"
					}, {
						code: "370827",
						name: "鱼台县"
					}, {
						code: "370828",
						name: "金乡县"
					}, {
						code: "370829",
						name: "嘉祥县"
					}, {
						code: "370830",
						name: "汶上县"
					}, {
						code: "370831",
						name: "泗水县"
					}, {
						code: "370832",
						name: "梁山县"
					}, {
						code: "370881",
						name: "曲阜市"
					}, {
						code: "370883",
						name: "邹城市"
					}]
				}, {
					code: "370900",
					name: "泰安市",
					children: [{
						code: "370901",
						name: "市辖区"
					}, {
						code: "370902",
						name: "泰山区"
					}, {
						code: "370911",
						name: "岱岳区"
					}, {
						code: "370921",
						name: "宁阳县"
					}, {
						code: "370923",
						name: "东平县"
					}, {
						code: "370982",
						name: "新泰市"
					}, {
						code: "370983",
						name: "肥城市"
					}]
				}, {
					code: "371000",
					name: "威海市",
					children: [{
						code: "371001",
						name: "市辖区"
					}, {
						code: "371002",
						name: "环翠区"
					}, {
						code: "371003",
						name: "文登区"
					}, {
						code: "371082",
						name: "荣成市"
					}, {
						code: "371083",
						name: "乳山市"
					}]
				}, {
					code: "371100",
					name: "日照市",
					children: [{
						code: "371101",
						name: "市辖区"
					}, {
						code: "371102",
						name: "东港区"
					}, {
						code: "371103",
						name: "岚山区"
					}, {
						code: "371121",
						name: "五莲县"
					}, {
						code: "371122",
						name: "莒县"
					}]
				}, {
					code: "371200",
					name: "莱芜市",
					children: [{
						code: "371201",
						name: "市辖区"
					}, {
						code: "371202",
						name: "莱城区"
					}, {
						code: "371203",
						name: "钢城区"
					}]
				}, {
					code: "371300",
					name: "临沂市",
					children: [{
						code: "371301",
						name: "市辖区"
					}, {
						code: "371302",
						name: "兰山区"
					}, {
						code: "371311",
						name: "罗庄区"
					}, {
						code: "371312",
						name: "河东区"
					}, {
						code: "371321",
						name: "沂南县"
					}, {
						code: "371322",
						name: "郯城县"
					}, {
						code: "371323",
						name: "沂水县"
					}, {
						code: "371324",
						name: "兰陵县"
					}, {
						code: "371325",
						name: "费县"
					}, {
						code: "371326",
						name: "平邑县"
					}, {
						code: "371327",
						name: "莒南县"
					}, {
						code: "371328",
						name: "蒙阴县"
					}, {
						code: "371329",
						name: "临沭县"
					}]
				}, {
					code: "371400",
					name: "德州市",
					children: [{
						code: "371401",
						name: "市辖区"
					}, {
						code: "371402",
						name: "德城区"
					}, {
						code: "371403",
						name: "陵城区"
					}, {
						code: "371422",
						name: "宁津县"
					}, {
						code: "371423",
						name: "庆云县"
					}, {
						code: "371424",
						name: "临邑县"
					}, {
						code: "371425",
						name: "齐河县"
					}, {
						code: "371426",
						name: "平原县"
					}, {
						code: "371427",
						name: "夏津县"
					}, {
						code: "371428",
						name: "武城县"
					}, {
						code: "371481",
						name: "乐陵市"
					}, {
						code: "371482",
						name: "禹城市"
					}]
				}, {
					code: "371500",
					name: "聊城市",
					children: [{
						code: "371501",
						name: "市辖区"
					}, {
						code: "371502",
						name: "东昌府区"
					}, {
						code: "371521",
						name: "阳谷县"
					}, {
						code: "371522",
						name: "莘县"
					}, {
						code: "371523",
						name: "茌平县"
					}, {
						code: "371524",
						name: "东阿县"
					}, {
						code: "371525",
						name: "冠县"
					}, {
						code: "371526",
						name: "高唐县"
					}, {
						code: "371581",
						name: "临清市"
					}]
				}, {
					code: "371600",
					name: "滨州市",
					children: [{
						code: "371601",
						name: "市辖区"
					}, {
						code: "371602",
						name: "滨城区"
					}, {
						code: "371603",
						name: "沾化区"
					}, {
						code: "371621",
						name: "惠民县"
					}, {
						code: "371622",
						name: "阳信县"
					}, {
						code: "371623",
						name: "无棣县"
					}, {
						code: "371625",
						name: "博兴县"
					}, {
						code: "371626",
						name: "邹平县"
					}]
				}, {
					code: "371700",
					name: "菏泽市",
					children: [{
						code: "371701",
						name: "市辖区"
					}, {
						code: "371702",
						name: "牡丹区"
					}, {
						code: "371703",
						name: "定陶区"
					}, {
						code: "371721",
						name: "曹县"
					}, {
						code: "371722",
						name: "单县"
					}, {
						code: "371723",
						name: "成武县"
					}, {
						code: "371724",
						name: "巨野县"
					}, {
						code: "371725",
						name: "郓城县"
					}, {
						code: "371726",
						name: "鄄城县"
					}, {
						code: "371728",
						name: "东明县"
					}]
				}]
			}, {
				code: "410000",
				name: "河南省",
				children: [{
					code: "410100",
					name: "郑州市",
					children: [{
						code: "410101",
						name: "市辖区"
					}, {
						code: "410102",
						name: "中原区"
					}, {
						code: "410103",
						name: "二七区"
					}, {
						code: "410104",
						name: "管城回族区"
					}, {
						code: "410105",
						name: "金水区"
					}, {
						code: "410106",
						name: "上街区"
					}, {
						code: "410108",
						name: "惠济区"
					}, {
						code: "410122",
						name: "中牟县"
					}, {
						code: "410181",
						name: "巩义市"
					}, {
						code: "410182",
						name: "荥阳市"
					}, {
						code: "410183",
						name: "新密市"
					}, {
						code: "410184",
						name: "新郑市"
					}, {
						code: "410185",
						name: "登封市"
					}]
				}, {
					code: "410200",
					name: "开封市",
					children: [{
						code: "410201",
						name: "市辖区"
					}, {
						code: "410202",
						name: "龙亭区"
					}, {
						code: "410203",
						name: "顺河回族区"
					}, {
						code: "410204",
						name: "鼓楼区"
					}, {
						code: "410205",
						name: "禹王台区"
					}, {
						code: "410211",
						name: "金明区"
					}, {
						code: "410212",
						name: "祥符区"
					}, {
						code: "410221",
						name: "杞县"
					}, {
						code: "410222",
						name: "通许县"
					}, {
						code: "410223",
						name: "尉氏县"
					}, {
						code: "410225",
						name: "兰考县"
					}]
				}, {
					code: "410300",
					name: "洛阳市",
					children: [{
						code: "410301",
						name: "市辖区"
					}, {
						code: "410302",
						name: "老城区"
					}, {
						code: "410303",
						name: "西工区"
					}, {
						code: "410304",
						name: "瀍河回族区"
					}, {
						code: "410305",
						name: "涧西区"
					}, {
						code: "410306",
						name: "吉利区"
					}, {
						code: "410311",
						name: "洛龙区"
					}, {
						code: "410322",
						name: "孟津县"
					}, {
						code: "410323",
						name: "新安县"
					}, {
						code: "410324",
						name: "栾川县"
					}, {
						code: "410325",
						name: "嵩县"
					}, {
						code: "410326",
						name: "汝阳县"
					}, {
						code: "410327",
						name: "宜阳县"
					}, {
						code: "410328",
						name: "洛宁县"
					}, {
						code: "410329",
						name: "伊川县"
					}, {
						code: "410381",
						name: "偃师市"
					}]
				}, {
					code: "410400",
					name: "平顶山市",
					children: [{
						code: "410401",
						name: "市辖区"
					}, {
						code: "410402",
						name: "新华区"
					}, {
						code: "410403",
						name: "卫东区"
					}, {
						code: "410404",
						name: "石龙区"
					}, {
						code: "410411",
						name: "湛河区"
					}, {
						code: "410421",
						name: "宝丰县"
					}, {
						code: "410422",
						name: "叶县"
					}, {
						code: "410423",
						name: "鲁山县"
					}, {
						code: "410425",
						name: "郏县"
					}, {
						code: "410481",
						name: "舞钢市"
					}, {
						code: "410482",
						name: "汝州市"
					}]
				}, {
					code: "410500",
					name: "安阳市",
					children: [{
						code: "410501",
						name: "市辖区"
					}, {
						code: "410502",
						name: "文峰区"
					}, {
						code: "410503",
						name: "北关区"
					}, {
						code: "410505",
						name: "殷都区"
					}, {
						code: "410506",
						name: "龙安区"
					}, {
						code: "410522",
						name: "安阳县"
					}, {
						code: "410523",
						name: "汤阴县"
					}, {
						code: "410526",
						name: "滑县"
					}, {
						code: "410527",
						name: "内黄县"
					}, {
						code: "410581",
						name: "林州市"
					}]
				}, {
					code: "410600",
					name: "鹤壁市",
					children: [{
						code: "410601",
						name: "市辖区"
					}, {
						code: "410602",
						name: "鹤山区"
					}, {
						code: "410603",
						name: "山城区"
					}, {
						code: "410611",
						name: "淇滨区"
					}, {
						code: "410621",
						name: "浚县"
					}, {
						code: "410622",
						name: "淇县"
					}]
				}, {
					code: "410700",
					name: "新乡市",
					children: [{
						code: "410701",
						name: "市辖区"
					}, {
						code: "410702",
						name: "红旗区"
					}, {
						code: "410703",
						name: "卫滨区"
					}, {
						code: "410704",
						name: "凤泉区"
					}, {
						code: "410711",
						name: "牧野区"
					}, {
						code: "410721",
						name: "新乡县"
					}, {
						code: "410724",
						name: "获嘉县"
					}, {
						code: "410725",
						name: "原阳县"
					}, {
						code: "410726",
						name: "延津县"
					}, {
						code: "410727",
						name: "封丘县"
					}, {
						code: "410728",
						name: "长垣县"
					}, {
						code: "410781",
						name: "卫辉市"
					}, {
						code: "410782",
						name: "辉县市"
					}]
				}, {
					code: "410800",
					name: "焦作市",
					children: [{
						code: "410801",
						name: "市辖区"
					}, {
						code: "410802",
						name: "解放区"
					}, {
						code: "410803",
						name: "中站区"
					}, {
						code: "410804",
						name: "马村区"
					}, {
						code: "410811",
						name: "山阳区"
					}, {
						code: "410821",
						name: "修武县"
					}, {
						code: "410822",
						name: "博爱县"
					}, {
						code: "410823",
						name: "武陟县"
					}, {
						code: "410825",
						name: "温县"
					}, {
						code: "410882",
						name: "沁阳市"
					}, {
						code: "410883",
						name: "孟州市"
					}]
				}, {
					code: "410900",
					name: "濮阳市",
					children: [{
						code: "410901",
						name: "市辖区"
					}, {
						code: "410902",
						name: "华龙区"
					}, {
						code: "410922",
						name: "清丰县"
					}, {
						code: "410923",
						name: "南乐县"
					}, {
						code: "410926",
						name: "范县"
					}, {
						code: "410927",
						name: "台前县"
					}, {
						code: "410928",
						name: "濮阳县"
					}]
				}, {
					code: "411000",
					name: "许昌市",
					children: [{
						code: "411001",
						name: "市辖区"
					}, {
						code: "411002",
						name: "魏都区"
					}, {
						code: "411023",
						name: "许昌县"
					}, {
						code: "411024",
						name: "鄢陵县"
					}, {
						code: "411025",
						name: "襄城县"
					}, {
						code: "411081",
						name: "禹州市"
					}, {
						code: "411082",
						name: "长葛市"
					}]
				}, {
					code: "411100",
					name: "漯河市",
					children: [{
						code: "411101",
						name: "市辖区"
					}, {
						code: "411102",
						name: "源汇区"
					}, {
						code: "411103",
						name: "郾城区"
					}, {
						code: "411104",
						name: "召陵区"
					}, {
						code: "411121",
						name: "舞阳县"
					}, {
						code: "411122",
						name: "临颍县"
					}]
				}, {
					code: "411200",
					name: "三门峡市",
					children: [{
						code: "411201",
						name: "市辖区"
					}, {
						code: "411202",
						name: "湖滨区"
					}, {
						code: "411203",
						name: "陕州区"
					}, {
						code: "411221",
						name: "渑池县"
					}, {
						code: "411224",
						name: "卢氏县"
					}, {
						code: "411281",
						name: "义马市"
					}, {
						code: "411282",
						name: "灵宝市"
					}]
				}, {
					code: "411300",
					name: "南阳市",
					children: [{
						code: "411301",
						name: "市辖区"
					}, {
						code: "411302",
						name: "宛城区"
					}, {
						code: "411303",
						name: "卧龙区"
					}, {
						code: "411321",
						name: "南召县"
					}, {
						code: "411322",
						name: "方城县"
					}, {
						code: "411323",
						name: "西峡县"
					}, {
						code: "411324",
						name: "镇平县"
					}, {
						code: "411325",
						name: "内乡县"
					}, {
						code: "411326",
						name: "淅川县"
					}, {
						code: "411327",
						name: "社旗县"
					}, {
						code: "411328",
						name: "唐河县"
					}, {
						code: "411329",
						name: "新野县"
					}, {
						code: "411330",
						name: "桐柏县"
					}, {
						code: "411381",
						name: "邓州市"
					}]
				}, {
					code: "411400",
					name: "商丘市",
					children: [{
						code: "411401",
						name: "市辖区"
					}, {
						code: "411402",
						name: "梁园区"
					}, {
						code: "411403",
						name: "睢阳区"
					}, {
						code: "411421",
						name: "民权县"
					}, {
						code: "411422",
						name: "睢县"
					}, {
						code: "411423",
						name: "宁陵县"
					}, {
						code: "411424",
						name: "柘城县"
					}, {
						code: "411425",
						name: "虞城县"
					}, {
						code: "411426",
						name: "夏邑县"
					}, {
						code: "411481",
						name: "永城市"
					}]
				}, {
					code: "411500",
					name: "信阳市",
					children: [{
						code: "411501",
						name: "市辖区"
					}, {
						code: "411502",
						name: "浉河区"
					}, {
						code: "411503",
						name: "平桥区"
					}, {
						code: "411521",
						name: "罗山县"
					}, {
						code: "411522",
						name: "光山县"
					}, {
						code: "411523",
						name: "新县"
					}, {
						code: "411524",
						name: "商城县"
					}, {
						code: "411525",
						name: "固始县"
					}, {
						code: "411526",
						name: "潢川县"
					}, {
						code: "411527",
						name: "淮滨县"
					}, {
						code: "411528",
						name: "息县"
					}]
				}, {
					code: "411600",
					name: "周口市",
					children: [{
						code: "411601",
						name: "市辖区"
					}, {
						code: "411602",
						name: "川汇区"
					}, {
						code: "411621",
						name: "扶沟县"
					}, {
						code: "411622",
						name: "西华县"
					}, {
						code: "411623",
						name: "商水县"
					}, {
						code: "411624",
						name: "沈丘县"
					}, {
						code: "411625",
						name: "郸城县"
					}, {
						code: "411626",
						name: "淮阳县"
					}, {
						code: "411627",
						name: "太康县"
					}, {
						code: "411628",
						name: "鹿邑县"
					}, {
						code: "411681",
						name: "项城市"
					}]
				}, {
					code: "411700",
					name: "驻马店市",
					children: [{
						code: "411701",
						name: "市辖区"
					}, {
						code: "411702",
						name: "驿城区"
					}, {
						code: "411721",
						name: "西平县"
					}, {
						code: "411722",
						name: "上蔡县"
					}, {
						code: "411723",
						name: "平舆县"
					}, {
						code: "411724",
						name: "正阳县"
					}, {
						code: "411725",
						name: "确山县"
					}, {
						code: "411726",
						name: "泌阳县"
					}, {
						code: "411727",
						name: "汝南县"
					}, {
						code: "411728",
						name: "遂平县"
					}, {
						code: "411729",
						name: "新蔡县"
					}]
				}, {
					code: "419000",
					name: "省直辖县级行政区划",
					children: [{
						code: "419001",
						name: "济源市"
					}]
				}]
			}, {
				code: "420000",
				name: "湖北省",
				children: [{
					code: "420100",
					name: "武汉市",
					children: [{
						code: "420101",
						name: "市辖区"
					}, {
						code: "420102",
						name: "江岸区"
					}, {
						code: "420103",
						name: "江汉区"
					}, {
						code: "420104",
						name: "硚口区"
					}, {
						code: "420105",
						name: "汉阳区"
					}, {
						code: "420106",
						name: "武昌区"
					}, {
						code: "420107",
						name: "青山区"
					}, {
						code: "420111",
						name: "洪山区"
					}, {
						code: "420112",
						name: "东西湖区"
					}, {
						code: "420113",
						name: "汉南区"
					}, {
						code: "420114",
						name: "蔡甸区"
					}, {
						code: "420115",
						name: "江夏区"
					}, {
						code: "420116",
						name: "黄陂区"
					}, {
						code: "420117",
						name: "新洲区"
					}]
				}, {
					code: "420200",
					name: "黄石市",
					children: [{
						code: "420201",
						name: "市辖区"
					}, {
						code: "420202",
						name: "黄石港区"
					}, {
						code: "420203",
						name: "西塞山区"
					}, {
						code: "420204",
						name: "下陆区"
					}, {
						code: "420205",
						name: "铁山区"
					}, {
						code: "420222",
						name: "阳新县"
					}, {
						code: "420281",
						name: "大冶市"
					}]
				}, {
					code: "420300",
					name: "十堰市",
					children: [{
						code: "420301",
						name: "市辖区"
					}, {
						code: "420302",
						name: "茅箭区"
					}, {
						code: "420303",
						name: "张湾区"
					}, {
						code: "420304",
						name: "郧阳区"
					}, {
						code: "420322",
						name: "郧西县"
					}, {
						code: "420323",
						name: "竹山县"
					}, {
						code: "420324",
						name: "竹溪县"
					}, {
						code: "420325",
						name: "房县"
					}, {
						code: "420381",
						name: "丹江口市"
					}]
				}, {
					code: "420500",
					name: "宜昌市",
					children: [{
						code: "420501",
						name: "市辖区"
					}, {
						code: "420502",
						name: "西陵区"
					}, {
						code: "420503",
						name: "伍家岗区"
					}, {
						code: "420504",
						name: "点军区"
					}, {
						code: "420505",
						name: "猇亭区"
					}, {
						code: "420506",
						name: "夷陵区"
					}, {
						code: "420525",
						name: "远安县"
					}, {
						code: "420526",
						name: "兴山县"
					}, {
						code: "420527",
						name: "秭归县"
					}, {
						code: "420528",
						name: "长阳土家族自治县"
					}, {
						code: "420529",
						name: "五峰土家族自治县"
					}, {
						code: "420581",
						name: "宜都市"
					}, {
						code: "420582",
						name: "当阳市"
					}, {
						code: "420583",
						name: "枝江市"
					}]
				}, {
					code: "420600",
					name: "襄阳市",
					children: [{
						code: "420601",
						name: "市辖区"
					}, {
						code: "420602",
						name: "襄城区"
					}, {
						code: "420606",
						name: "樊城区"
					}, {
						code: "420607",
						name: "襄州区"
					}, {
						code: "420624",
						name: "南漳县"
					}, {
						code: "420625",
						name: "谷城县"
					}, {
						code: "420626",
						name: "保康县"
					}, {
						code: "420682",
						name: "老河口市"
					}, {
						code: "420683",
						name: "枣阳市"
					}, {
						code: "420684",
						name: "宜城市"
					}]
				}, {
					code: "420700",
					name: "鄂州市",
					children: [{
						code: "420701",
						name: "市辖区"
					}, {
						code: "420702",
						name: "梁子湖区"
					}, {
						code: "420703",
						name: "华容区"
					}, {
						code: "420704",
						name: "鄂城区"
					}]
				}, {
					code: "420800",
					name: "荆门市",
					children: [{
						code: "420801",
						name: "市辖区"
					}, {
						code: "420802",
						name: "东宝区"
					}, {
						code: "420804",
						name: "掇刀区"
					}, {
						code: "420821",
						name: "京山县"
					}, {
						code: "420822",
						name: "沙洋县"
					}, {
						code: "420881",
						name: "钟祥市"
					}]
				}, {
					code: "420900",
					name: "孝感市",
					children: [{
						code: "420901",
						name: "市辖区"
					}, {
						code: "420902",
						name: "孝南区"
					}, {
						code: "420921",
						name: "孝昌县"
					}, {
						code: "420922",
						name: "大悟县"
					}, {
						code: "420923",
						name: "云梦县"
					}, {
						code: "420981",
						name: "应城市"
					}, {
						code: "420982",
						name: "安陆市"
					}, {
						code: "420984",
						name: "汉川市"
					}]
				}, {
					code: "421000",
					name: "荆州市",
					children: [{
						code: "421001",
						name: "市辖区"
					}, {
						code: "421002",
						name: "沙市区"
					}, {
						code: "421003",
						name: "荆州区"
					}, {
						code: "421022",
						name: "公安县"
					}, {
						code: "421023",
						name: "监利县"
					}, {
						code: "421024",
						name: "江陵县"
					}, {
						code: "421081",
						name: "石首市"
					}, {
						code: "421083",
						name: "洪湖市"
					}, {
						code: "421087",
						name: "松滋市"
					}]
				}, {
					code: "421100",
					name: "黄冈市",
					children: [{
						code: "421101",
						name: "市辖区"
					}, {
						code: "421102",
						name: "黄州区"
					}, {
						code: "421121",
						name: "团风县"
					}, {
						code: "421122",
						name: "红安县"
					}, {
						code: "421123",
						name: "罗田县"
					}, {
						code: "421124",
						name: "英山县"
					}, {
						code: "421125",
						name: "浠水县"
					}, {
						code: "421126",
						name: "蕲春县"
					}, {
						code: "421127",
						name: "黄梅县"
					}, {
						code: "421181",
						name: "麻城市"
					}, {
						code: "421182",
						name: "武穴市"
					}]
				}, {
					code: "421200",
					name: "咸宁市",
					children: [{
						code: "421201",
						name: "市辖区"
					}, {
						code: "421202",
						name: "咸安区"
					}, {
						code: "421221",
						name: "嘉鱼县"
					}, {
						code: "421222",
						name: "通城县"
					}, {
						code: "421223",
						name: "崇阳县"
					}, {
						code: "421224",
						name: "通山县"
					}, {
						code: "421281",
						name: "赤壁市"
					}]
				}, {
					code: "421300",
					name: "随州市",
					children: [{
						code: "421301",
						name: "市辖区"
					}, {
						code: "421303",
						name: "曾都区"
					}, {
						code: "421321",
						name: "随县"
					}, {
						code: "421381",
						name: "广水市"
					}]
				}, {
					code: "422800",
					name: "恩施土家族苗族自治州",
					children: [{
						code: "422801",
						name: "恩施市"
					}, {
						code: "422802",
						name: "利川市"
					}, {
						code: "422822",
						name: "建始县"
					}, {
						code: "422823",
						name: "巴东县"
					}, {
						code: "422825",
						name: "宣恩县"
					}, {
						code: "422826",
						name: "咸丰县"
					}, {
						code: "422827",
						name: "来凤县"
					}, {
						code: "422828",
						name: "鹤峰县"
					}]
				}, {
					code: "429000",
					name: "省直辖县级行政区划",
					children: [{
						code: "429004",
						name: "仙桃市"
					}, {
						code: "429005",
						name: "潜江市"
					}, {
						code: "429006",
						name: "天门市"
					}, {
						code: "429021",
						name: "神农架林区"
					}]
				}]
			}, {
				code: "430000",
				name: "湖南省",
				children: [{
					code: "430100",
					name: "长沙市",
					children: [{
						code: "430101",
						name: "市辖区"
					}, {
						code: "430102",
						name: "芙蓉区"
					}, {
						code: "430103",
						name: "天心区"
					}, {
						code: "430104",
						name: "岳麓区"
					}, {
						code: "430105",
						name: "开福区"
					}, {
						code: "430111",
						name: "雨花区"
					}, {
						code: "430112",
						name: "望城区"
					}, {
						code: "430121",
						name: "长沙县"
					}, {
						code: "430124",
						name: "宁乡县"
					}, {
						code: "430181",
						name: "浏阳市"
					}]
				}, {
					code: "430200",
					name: "株洲市",
					children: [{
						code: "430201",
						name: "市辖区"
					}, {
						code: "430202",
						name: "荷塘区"
					}, {
						code: "430203",
						name: "芦淞区"
					}, {
						code: "430204",
						name: "石峰区"
					}, {
						code: "430211",
						name: "天元区"
					}, {
						code: "430221",
						name: "株洲县"
					}, {
						code: "430223",
						name: "攸县"
					}, {
						code: "430224",
						name: "茶陵县"
					}, {
						code: "430225",
						name: "炎陵县"
					}, {
						code: "430281",
						name: "醴陵市"
					}]
				}, {
					code: "430300",
					name: "湘潭市",
					children: [{
						code: "430301",
						name: "市辖区"
					}, {
						code: "430302",
						name: "雨湖区"
					}, {
						code: "430304",
						name: "岳塘区"
					}, {
						code: "430321",
						name: "湘潭县"
					}, {
						code: "430381",
						name: "湘乡市"
					}, {
						code: "430382",
						name: "韶山市"
					}]
				}, {
					code: "430400",
					name: "衡阳市",
					children: [{
						code: "430401",
						name: "市辖区"
					}, {
						code: "430405",
						name: "珠晖区"
					}, {
						code: "430406",
						name: "雁峰区"
					}, {
						code: "430407",
						name: "石鼓区"
					}, {
						code: "430408",
						name: "蒸湘区"
					}, {
						code: "430412",
						name: "南岳区"
					}, {
						code: "430421",
						name: "衡阳县"
					}, {
						code: "430422",
						name: "衡南县"
					}, {
						code: "430423",
						name: "衡山县"
					}, {
						code: "430424",
						name: "衡东县"
					}, {
						code: "430426",
						name: "祁东县"
					}, {
						code: "430481",
						name: "耒阳市"
					}, {
						code: "430482",
						name: "常宁市"
					}]
				}, {
					code: "430500",
					name: "邵阳市",
					children: [{
						code: "430501",
						name: "市辖区"
					}, {
						code: "430502",
						name: "双清区"
					}, {
						code: "430503",
						name: "大祥区"
					}, {
						code: "430511",
						name: "北塔区"
					}, {
						code: "430521",
						name: "邵东县"
					}, {
						code: "430522",
						name: "新邵县"
					}, {
						code: "430523",
						name: "邵阳县"
					}, {
						code: "430524",
						name: "隆回县"
					}, {
						code: "430525",
						name: "洞口县"
					}, {
						code: "430527",
						name: "绥宁县"
					}, {
						code: "430528",
						name: "新宁县"
					}, {
						code: "430529",
						name: "城步苗族自治县"
					}, {
						code: "430581",
						name: "武冈市"
					}]
				}, {
					code: "430600",
					name: "岳阳市",
					children: [{
						code: "430601",
						name: "市辖区"
					}, {
						code: "430602",
						name: "岳阳楼区"
					}, {
						code: "430603",
						name: "云溪区"
					}, {
						code: "430611",
						name: "君山区"
					}, {
						code: "430621",
						name: "岳阳县"
					}, {
						code: "430623",
						name: "华容县"
					}, {
						code: "430624",
						name: "湘阴县"
					}, {
						code: "430626",
						name: "平江县"
					}, {
						code: "430681",
						name: "汨罗市"
					}, {
						code: "430682",
						name: "临湘市"
					}]
				}, {
					code: "430700",
					name: "常德市",
					children: [{
						code: "430701",
						name: "市辖区"
					}, {
						code: "430702",
						name: "武陵区"
					}, {
						code: "430703",
						name: "鼎城区"
					}, {
						code: "430721",
						name: "安乡县"
					}, {
						code: "430722",
						name: "汉寿县"
					}, {
						code: "430723",
						name: "澧县"
					}, {
						code: "430724",
						name: "临澧县"
					}, {
						code: "430725",
						name: "桃源县"
					}, {
						code: "430726",
						name: "石门县"
					}, {
						code: "430781",
						name: "津市市"
					}]
				}, {
					code: "430800",
					name: "张家界市",
					children: [{
						code: "430801",
						name: "市辖区"
					}, {
						code: "430802",
						name: "永定区"
					}, {
						code: "430811",
						name: "武陵源区"
					}, {
						code: "430821",
						name: "慈利县"
					}, {
						code: "430822",
						name: "桑植县"
					}]
				}, {
					code: "430900",
					name: "益阳市",
					children: [{
						code: "430901",
						name: "市辖区"
					}, {
						code: "430902",
						name: "资阳区"
					}, {
						code: "430903",
						name: "赫山区"
					}, {
						code: "430921",
						name: "南县"
					}, {
						code: "430922",
						name: "桃江县"
					}, {
						code: "430923",
						name: "安化县"
					}, {
						code: "430981",
						name: "沅江市"
					}]
				}, {
					code: "431000",
					name: "郴州市",
					children: [{
						code: "431001",
						name: "市辖区"
					}, {
						code: "431002",
						name: "北湖区"
					}, {
						code: "431003",
						name: "苏仙区"
					}, {
						code: "431021",
						name: "桂阳县"
					}, {
						code: "431022",
						name: "宜章县"
					}, {
						code: "431023",
						name: "永兴县"
					}, {
						code: "431024",
						name: "嘉禾县"
					}, {
						code: "431025",
						name: "临武县"
					}, {
						code: "431026",
						name: "汝城县"
					}, {
						code: "431027",
						name: "桂东县"
					}, {
						code: "431028",
						name: "安仁县"
					}, {
						code: "431081",
						name: "资兴市"
					}]
				}, {
					code: "431100",
					name: "永州市",
					children: [{
						code: "431101",
						name: "市辖区"
					}, {
						code: "431102",
						name: "零陵区"
					}, {
						code: "431103",
						name: "冷水滩区"
					}, {
						code: "431121",
						name: "祁阳县"
					}, {
						code: "431122",
						name: "东安县"
					}, {
						code: "431123",
						name: "双牌县"
					}, {
						code: "431124",
						name: "道县"
					}, {
						code: "431125",
						name: "江永县"
					}, {
						code: "431126",
						name: "宁远县"
					}, {
						code: "431127",
						name: "蓝山县"
					}, {
						code: "431128",
						name: "新田县"
					}, {
						code: "431129",
						name: "江华瑶族自治县"
					}]
				}, {
					code: "431200",
					name: "怀化市",
					children: [{
						code: "431201",
						name: "市辖区"
					}, {
						code: "431202",
						name: "鹤城区"
					}, {
						code: "431221",
						name: "中方县"
					}, {
						code: "431222",
						name: "沅陵县"
					}, {
						code: "431223",
						name: "辰溪县"
					}, {
						code: "431224",
						name: "溆浦县"
					}, {
						code: "431225",
						name: "会同县"
					}, {
						code: "431226",
						name: "麻阳苗族自治县"
					}, {
						code: "431227",
						name: "新晃侗族自治县"
					}, {
						code: "431228",
						name: "芷江侗族自治县"
					}, {
						code: "431229",
						name: "靖州苗族侗族自治县"
					}, {
						code: "431230",
						name: "通道侗族自治县"
					}, {
						code: "431281",
						name: "洪江市"
					}]
				}, {
					code: "431300",
					name: "娄底市",
					children: [{
						code: "431301",
						name: "市辖区"
					}, {
						code: "431302",
						name: "娄星区"
					}, {
						code: "431321",
						name: "双峰县"
					}, {
						code: "431322",
						name: "新化县"
					}, {
						code: "431381",
						name: "冷水江市"
					}, {
						code: "431382",
						name: "涟源市"
					}]
				}, {
					code: "433100",
					name: "湘西土家族苗族自治州",
					children: [{
						code: "433101",
						name: "吉首市"
					}, {
						code: "433122",
						name: "泸溪县"
					}, {
						code: "433123",
						name: "凤凰县"
					}, {
						code: "433124",
						name: "花垣县"
					}, {
						code: "433125",
						name: "保靖县"
					}, {
						code: "433126",
						name: "古丈县"
					}, {
						code: "433127",
						name: "永顺县"
					}, {
						code: "433130",
						name: "龙山县"
					}]
				}]
			}, {
				code: "440000",
				name: "广东省",
				children: [{
					code: "440100",
					name: "广州市",
					children: [{
						code: "440101",
						name: "市辖区"
					}, {
						code: "440103",
						name: "荔湾区"
					}, {
						code: "440104",
						name: "越秀区"
					}, {
						code: "440105",
						name: "海珠区"
					}, {
						code: "440106",
						name: "天河区"
					}, {
						code: "440111",
						name: "白云区"
					}, {
						code: "440112",
						name: "黄埔区"
					}, {
						code: "440113",
						name: "番禺区"
					}, {
						code: "440114",
						name: "花都区"
					}, {
						code: "440115",
						name: "南沙区"
					}, {
						code: "440117",
						name: "从化区"
					}, {
						code: "440118",
						name: "增城区"
					}]
				}, {
					code: "440200",
					name: "韶关市",
					children: [{
						code: "440201",
						name: "市辖区"
					}, {
						code: "440203",
						name: "武江区"
					}, {
						code: "440204",
						name: "浈江区"
					}, {
						code: "440205",
						name: "曲江区"
					}, {
						code: "440222",
						name: "始兴县"
					}, {
						code: "440224",
						name: "仁化县"
					}, {
						code: "440229",
						name: "翁源县"
					}, {
						code: "440232",
						name: "乳源瑶族自治县"
					}, {
						code: "440233",
						name: "新丰县"
					}, {
						code: "440281",
						name: "乐昌市"
					}, {
						code: "440282",
						name: "南雄市"
					}]
				}, {
					code: "440300",
					name: "深圳市",
					children: [{
						code: "440301",
						name: "市辖区"
					}, {
						code: "440303",
						name: "罗湖区"
					}, {
						code: "440304",
						name: "福田区"
					}, {
						code: "440305",
						name: "南山区"
					}, {
						code: "440306",
						name: "宝安区"
					}, {
						code: "440307",
						name: "龙岗区"
					}, {
						code: "440308",
						name: "盐田区"
					}]
				}, {
					code: "440400",
					name: "珠海市",
					children: [{
						code: "440401",
						name: "市辖区"
					}, {
						code: "440402",
						name: "香洲区"
					}, {
						code: "440403",
						name: "斗门区"
					}, {
						code: "440404",
						name: "金湾区"
					}]
				}, {
					code: "440500",
					name: "汕头市",
					children: [{
						code: "440501",
						name: "市辖区"
					}, {
						code: "440507",
						name: "龙湖区"
					}, {
						code: "440511",
						name: "金平区"
					}, {
						code: "440512",
						name: "濠江区"
					}, {
						code: "440513",
						name: "潮阳区"
					}, {
						code: "440514",
						name: "潮南区"
					}, {
						code: "440515",
						name: "澄海区"
					}, {
						code: "440523",
						name: "南澳县"
					}]
				}, {
					code: "440600",
					name: "佛山市",
					children: [{
						code: "440601",
						name: "市辖区"
					}, {
						code: "440604",
						name: "禅城区"
					}, {
						code: "440605",
						name: "南海区"
					}, {
						code: "440606",
						name: "顺德区"
					}, {
						code: "440607",
						name: "三水区"
					}, {
						code: "440608",
						name: "高明区"
					}]
				}, {
					code: "440700",
					name: "江门市",
					children: [{
						code: "440701",
						name: "市辖区"
					}, {
						code: "440703",
						name: "蓬江区"
					}, {
						code: "440704",
						name: "江海区"
					}, {
						code: "440705",
						name: "新会区"
					}, {
						code: "440781",
						name: "台山市"
					}, {
						code: "440783",
						name: "开平市"
					}, {
						code: "440784",
						name: "鹤山市"
					}, {
						code: "440785",
						name: "恩平市"
					}]
				}, {
					code: "440800",
					name: "湛江市",
					children: [{
						code: "440801",
						name: "市辖区"
					}, {
						code: "440802",
						name: "赤坎区"
					}, {
						code: "440803",
						name: "霞山区"
					}, {
						code: "440804",
						name: "坡头区"
					}, {
						code: "440811",
						name: "麻章区"
					}, {
						code: "440823",
						name: "遂溪县"
					}, {
						code: "440825",
						name: "徐闻县"
					}, {
						code: "440881",
						name: "廉江市"
					}, {
						code: "440882",
						name: "雷州市"
					}, {
						code: "440883",
						name: "吴川市"
					}]
				}, {
					code: "440900",
					name: "茂名市",
					children: [{
						code: "440901",
						name: "市辖区"
					}, {
						code: "440902",
						name: "茂南区"
					}, {
						code: "440904",
						name: "电白区"
					}, {
						code: "440981",
						name: "高州市"
					}, {
						code: "440982",
						name: "化州市"
					}, {
						code: "440983",
						name: "信宜市"
					}]
				}, {
					code: "441200",
					name: "肇庆市",
					children: [{
						code: "441201",
						name: "市辖区"
					}, {
						code: "441202",
						name: "端州区"
					}, {
						code: "441203",
						name: "鼎湖区"
					}, {
						code: "441204",
						name: "高要区"
					}, {
						code: "441223",
						name: "广宁县"
					}, {
						code: "441224",
						name: "怀集县"
					}, {
						code: "441225",
						name: "封开县"
					}, {
						code: "441226",
						name: "德庆县"
					}, {
						code: "441284",
						name: "四会市"
					}]
				}, {
					code: "441300",
					name: "惠州市",
					children: [{
						code: "441301",
						name: "市辖区"
					}, {
						code: "441302",
						name: "惠城区"
					}, {
						code: "441303",
						name: "惠阳区"
					}, {
						code: "441322",
						name: "博罗县"
					}, {
						code: "441323",
						name: "惠东县"
					}, {
						code: "441324",
						name: "龙门县"
					}]
				}, {
					code: "441400",
					name: "梅州市",
					children: [{
						code: "441401",
						name: "市辖区"
					}, {
						code: "441402",
						name: "梅江区"
					}, {
						code: "441403",
						name: "梅县区"
					}, {
						code: "441422",
						name: "大埔县"
					}, {
						code: "441423",
						name: "丰顺县"
					}, {
						code: "441424",
						name: "五华县"
					}, {
						code: "441426",
						name: "平远县"
					}, {
						code: "441427",
						name: "蕉岭县"
					}, {
						code: "441481",
						name: "兴宁市"
					}]
				}, {
					code: "441500",
					name: "汕尾市",
					children: [{
						code: "441501",
						name: "市辖区"
					}, {
						code: "441502",
						name: "城区"
					}, {
						code: "441521",
						name: "海丰县"
					}, {
						code: "441523",
						name: "陆河县"
					}, {
						code: "441581",
						name: "陆丰市"
					}]
				}, {
					code: "441600",
					name: "河源市",
					children: [{
						code: "441601",
						name: "市辖区"
					}, {
						code: "441602",
						name: "源城区"
					}, {
						code: "441621",
						name: "紫金县"
					}, {
						code: "441622",
						name: "龙川县"
					}, {
						code: "441623",
						name: "连平县"
					}, {
						code: "441624",
						name: "和平县"
					}, {
						code: "441625",
						name: "东源县"
					}]
				}, {
					code: "441700",
					name: "阳江市",
					children: [{
						code: "441701",
						name: "市辖区"
					}, {
						code: "441702",
						name: "江城区"
					}, {
						code: "441704",
						name: "阳东区"
					}, {
						code: "441721",
						name: "阳西县"
					}, {
						code: "441781",
						name: "阳春市"
					}]
				}, {
					code: "441800",
					name: "清远市",
					children: [{
						code: "441801",
						name: "市辖区"
					}, {
						code: "441802",
						name: "清城区"
					}, {
						code: "441803",
						name: "清新区"
					}, {
						code: "441821",
						name: "佛冈县"
					}, {
						code: "441823",
						name: "阳山县"
					}, {
						code: "441825",
						name: "连山壮族瑶族自治县"
					}, {
						code: "441826",
						name: "连南瑶族自治县"
					}, {
						code: "441881",
						name: "英德市"
					}, {
						code: "441882",
						name: "连州市"
					}]
				}, {
					code: "441900",
					name: "东莞市"
				}, {
					code: "442000",
					name: "中山市"
				}, {
					code: "445100",
					name: "潮州市",
					children: [{
						code: "445101",
						name: "市辖区"
					}, {
						code: "445102",
						name: "湘桥区"
					}, {
						code: "445103",
						name: "潮安区"
					}, {
						code: "445122",
						name: "饶平县"
					}]
				}, {
					code: "445200",
					name: "揭阳市",
					children: [{
						code: "445201",
						name: "市辖区"
					}, {
						code: "445202",
						name: "榕城区"
					}, {
						code: "445203",
						name: "揭东区"
					}, {
						code: "445222",
						name: "揭西县"
					}, {
						code: "445224",
						name: "惠来县"
					}, {
						code: "445281",
						name: "普宁市"
					}]
				}, {
					code: "445300",
					name: "云浮市",
					children: [{
						code: "445301",
						name: "市辖区"
					}, {
						code: "445302",
						name: "云城区"
					}, {
						code: "445303",
						name: "云安区"
					}, {
						code: "445321",
						name: "新兴县"
					}, {
						code: "445322",
						name: "郁南县"
					}, {
						code: "445381",
						name: "罗定市"
					}]
				}]
			}, {
				code: "450000",
				name: "广西壮族自治区",
				children: [{
					code: "450100",
					name: "南宁市",
					children: [{
						code: "450101",
						name: "市辖区"
					}, {
						code: "450102",
						name: "兴宁区"
					}, {
						code: "450103",
						name: "青秀区"
					}, {
						code: "450105",
						name: "江南区"
					}, {
						code: "450107",
						name: "西乡塘区"
					}, {
						code: "450108",
						name: "良庆区"
					}, {
						code: "450109",
						name: "邕宁区"
					}, {
						code: "450110",
						name: "武鸣区"
					}, {
						code: "450123",
						name: "隆安县"
					}, {
						code: "450124",
						name: "马山县"
					}, {
						code: "450125",
						name: "上林县"
					}, {
						code: "450126",
						name: "宾阳县"
					}, {
						code: "450127",
						name: "横县"
					}]
				}, {
					code: "450200",
					name: "柳州市",
					children: [{
						code: "450201",
						name: "市辖区"
					}, {
						code: "450202",
						name: "城中区"
					}, {
						code: "450203",
						name: "鱼峰区"
					}, {
						code: "450204",
						name: "柳南区"
					}, {
						code: "450205",
						name: "柳北区"
					}, {
						code: "450206",
						name: "柳江区"
					}, {
						code: "450222",
						name: "柳城县"
					}, {
						code: "450223",
						name: "鹿寨县"
					}, {
						code: "450224",
						name: "融安县"
					}, {
						code: "450225",
						name: "融水苗族自治县"
					}, {
						code: "450226",
						name: "三江侗族自治县"
					}]
				}, {
					code: "450300",
					name: "桂林市",
					children: [{
						code: "450301",
						name: "市辖区"
					}, {
						code: "450302",
						name: "秀峰区"
					}, {
						code: "450303",
						name: "叠彩区"
					}, {
						code: "450304",
						name: "象山区"
					}, {
						code: "450305",
						name: "七星区"
					}, {
						code: "450311",
						name: "雁山区"
					}, {
						code: "450312",
						name: "临桂区"
					}, {
						code: "450321",
						name: "阳朔县"
					}, {
						code: "450323",
						name: "灵川县"
					}, {
						code: "450324",
						name: "全州县"
					}, {
						code: "450325",
						name: "兴安县"
					}, {
						code: "450326",
						name: "永福县"
					}, {
						code: "450327",
						name: "灌阳县"
					}, {
						code: "450328",
						name: "龙胜各族自治县"
					}, {
						code: "450329",
						name: "资源县"
					}, {
						code: "450330",
						name: "平乐县"
					}, {
						code: "450331",
						name: "荔浦县"
					}, {
						code: "450332",
						name: "恭城瑶族自治县"
					}]
				}, {
					code: "450400",
					name: "梧州市",
					children: [{
						code: "450401",
						name: "市辖区"
					}, {
						code: "450403",
						name: "万秀区"
					}, {
						code: "450405",
						name: "长洲区"
					}, {
						code: "450406",
						name: "龙圩区"
					}, {
						code: "450421",
						name: "苍梧县"
					}, {
						code: "450422",
						name: "藤县"
					}, {
						code: "450423",
						name: "蒙山县"
					}, {
						code: "450481",
						name: "岑溪市"
					}]
				}, {
					code: "450500",
					name: "北海市",
					children: [{
						code: "450501",
						name: "市辖区"
					}, {
						code: "450502",
						name: "海城区"
					}, {
						code: "450503",
						name: "银海区"
					}, {
						code: "450512",
						name: "铁山港区"
					}, {
						code: "450521",
						name: "合浦县"
					}]
				}, {
					code: "450600",
					name: "防城港市",
					children: [{
						code: "450601",
						name: "市辖区"
					}, {
						code: "450602",
						name: "港口区"
					}, {
						code: "450603",
						name: "防城区"
					}, {
						code: "450621",
						name: "上思县"
					}, {
						code: "450681",
						name: "东兴市"
					}]
				}, {
					code: "450700",
					name: "钦州市",
					children: [{
						code: "450701",
						name: "市辖区"
					}, {
						code: "450702",
						name: "钦南区"
					}, {
						code: "450703",
						name: "钦北区"
					}, {
						code: "450721",
						name: "灵山县"
					}, {
						code: "450722",
						name: "浦北县"
					}]
				}, {
					code: "450800",
					name: "贵港市",
					children: [{
						code: "450801",
						name: "市辖区"
					}, {
						code: "450802",
						name: "港北区"
					}, {
						code: "450803",
						name: "港南区"
					}, {
						code: "450804",
						name: "覃塘区"
					}, {
						code: "450821",
						name: "平南县"
					}, {
						code: "450881",
						name: "桂平市"
					}]
				}, {
					code: "450900",
					name: "玉林市",
					children: [{
						code: "450901",
						name: "市辖区"
					}, {
						code: "450902",
						name: "玉州区"
					}, {
						code: "450903",
						name: "福绵区"
					}, {
						code: "450921",
						name: "容县"
					}, {
						code: "450922",
						name: "陆川县"
					}, {
						code: "450923",
						name: "博白县"
					}, {
						code: "450924",
						name: "兴业县"
					}, {
						code: "450981",
						name: "北流市"
					}]
				}, {
					code: "451000",
					name: "百色市",
					children: [{
						code: "451001",
						name: "市辖区"
					}, {
						code: "451002",
						name: "右江区"
					}, {
						code: "451021",
						name: "田阳县"
					}, {
						code: "451022",
						name: "田东县"
					}, {
						code: "451023",
						name: "平果县"
					}, {
						code: "451024",
						name: "德保县"
					}, {
						code: "451026",
						name: "那坡县"
					}, {
						code: "451027",
						name: "凌云县"
					}, {
						code: "451028",
						name: "乐业县"
					}, {
						code: "451029",
						name: "田林县"
					}, {
						code: "451030",
						name: "西林县"
					}, {
						code: "451031",
						name: "隆林各族自治县"
					}, {
						code: "451081",
						name: "靖西市"
					}]
				}, {
					code: "451100",
					name: "贺州市",
					children: [{
						code: "451101",
						name: "市辖区"
					}, {
						code: "451102",
						name: "八步区"
					}, {
						code: "451103",
						name: "平桂区"
					}, {
						code: "451121",
						name: "昭平县"
					}, {
						code: "451122",
						name: "钟山县"
					}, {
						code: "451123",
						name: "富川瑶族自治县"
					}]
				}, {
					code: "451200",
					name: "河池市",
					children: [{
						code: "451201",
						name: "市辖区"
					}, {
						code: "451202",
						name: "金城江区"
					}, {
						code: "451221",
						name: "南丹县"
					}, {
						code: "451222",
						name: "天峨县"
					}, {
						code: "451223",
						name: "凤山县"
					}, {
						code: "451224",
						name: "东兰县"
					}, {
						code: "451225",
						name: "罗城仫佬族自治县"
					}, {
						code: "451226",
						name: "环江毛南族自治县"
					}, {
						code: "451227",
						name: "巴马瑶族自治县"
					}, {
						code: "451228",
						name: "都安瑶族自治县"
					}, {
						code: "451229",
						name: "大化瑶族自治县"
					}, {
						code: "451281",
						name: "宜州市"
					}]
				}, {
					code: "451300",
					name: "来宾市",
					children: [{
						code: "451301",
						name: "市辖区"
					}, {
						code: "451302",
						name: "兴宾区"
					}, {
						code: "451321",
						name: "忻城县"
					}, {
						code: "451322",
						name: "象州县"
					}, {
						code: "451323",
						name: "武宣县"
					}, {
						code: "451324",
						name: "金秀瑶族自治县"
					}, {
						code: "451381",
						name: "合山市"
					}]
				}, {
					code: "451400",
					name: "崇左市",
					children: [{
						code: "451401",
						name: "市辖区"
					}, {
						code: "451402",
						name: "江州区"
					}, {
						code: "451421",
						name: "扶绥县"
					}, {
						code: "451422",
						name: "宁明县"
					}, {
						code: "451423",
						name: "龙州县"
					}, {
						code: "451424",
						name: "大新县"
					}, {
						code: "451425",
						name: "天等县"
					}, {
						code: "451481",
						name: "凭祥市"
					}]
				}]
			}, {
				code: "460000",
				name: "海南省",
				children: [{
					code: "460100",
					name: "海口市",
					children: [{
						code: "460101",
						name: "市辖区"
					}, {
						code: "460105",
						name: "秀英区"
					}, {
						code: "460106",
						name: "龙华区"
					}, {
						code: "460107",
						name: "琼山区"
					}, {
						code: "460108",
						name: "美兰区"
					}]
				}, {
					code: "460200",
					name: "三亚市",
					children: [{
						code: "460201",
						name: "市辖区"
					}, {
						code: "460202",
						name: "海棠区"
					}, {
						code: "460203",
						name: "吉阳区"
					}, {
						code: "460204",
						name: "天涯区"
					}, {
						code: "460205",
						name: "崖州区"
					}]
				}, {
					code: "460300",
					name: "三沙市"
				}, {
					code: "460400",
					name: "儋州市"
				}, {
					code: "469000",
					name: "省直辖县级行政区划",
					children: [{
						code: "469001",
						name: "五指山市"
					}, {
						code: "469002",
						name: "琼海市"
					}, {
						code: "469005",
						name: "文昌市"
					}, {
						code: "469006",
						name: "万宁市"
					}, {
						code: "469007",
						name: "东方市"
					}, {
						code: "469021",
						name: "定安县"
					}, {
						code: "469022",
						name: "屯昌县"
					}, {
						code: "469023",
						name: "澄迈县"
					}, {
						code: "469024",
						name: "临高县"
					}, {
						code: "469025",
						name: "白沙黎族自治县"
					}, {
						code: "469026",
						name: "昌江黎族自治县"
					}, {
						code: "469027",
						name: "乐东黎族自治县"
					}, {
						code: "469028",
						name: "陵水黎族自治县"
					}, {
						code: "469029",
						name: "保亭黎族苗族自治县"
					}, {
						code: "469030",
						name: "琼中黎族苗族自治县"
					}]
				}]
			}, {
				code: "500000",
				name: "重庆市",
				children: [{
					code: "500100",
					name: "市辖区",
					children: [{
						code: "500101",
						name: "万州区"
					}, {
						code: "500102",
						name: "涪陵区"
					}, {
						code: "500103",
						name: "渝中区"
					}, {
						code: "500104",
						name: "大渡口区"
					}, {
						code: "500105",
						name: "江北区"
					}, {
						code: "500106",
						name: "沙坪坝区"
					}, {
						code: "500107",
						name: "九龙坡区"
					}, {
						code: "500108",
						name: "南岸区"
					}, {
						code: "500109",
						name: "北碚区"
					}, {
						code: "500110",
						name: "綦江区"
					}, {
						code: "500111",
						name: "大足区"
					}, {
						code: "500112",
						name: "渝北区"
					}, {
						code: "500113",
						name: "巴南区"
					}, {
						code: "500114",
						name: "黔江区"
					}, {
						code: "500115",
						name: "长寿区"
					}, {
						code: "500116",
						name: "江津区"
					}, {
						code: "500117",
						name: "合川区"
					}, {
						code: "500118",
						name: "永川区"
					}, {
						code: "500119",
						name: "南川区"
					}, {
						code: "500120",
						name: "璧山区"
					}, {
						code: "500151",
						name: "铜梁区"
					}, {
						code: "500152",
						name: "潼南区"
					}, {
						code: "500153",
						name: "荣昌区"
					}, {
						code: "500154",
						name: "开州区"
					}]
				}, {
					code: "500200",
					name: "县",
					children: [{
						code: "500228",
						name: "梁平县"
					}, {
						code: "500229",
						name: "城口县"
					}, {
						code: "500230",
						name: "丰都县"
					}, {
						code: "500231",
						name: "垫江县"
					}, {
						code: "500232",
						name: "武隆县"
					}, {
						code: "500233",
						name: "忠县"
					}, {
						code: "500235",
						name: "云阳县"
					}, {
						code: "500236",
						name: "奉节县"
					}, {
						code: "500237",
						name: "巫山县"
					}, {
						code: "500238",
						name: "巫溪县"
					}, {
						code: "500240",
						name: "石柱土家族自治县"
					}, {
						code: "500241",
						name: "秀山土家族苗族自治县"
					}, {
						code: "500242",
						name: "酉阳土家族苗族自治县"
					}, {
						code: "500243",
						name: "彭水苗族土家族自治县"
					}]
				}]
			}, {
				code: "510000",
				name: "四川省",
				children: [{
					code: "510100",
					name: "成都市",
					children: [{
						code: "510101",
						name: "市辖区"
					}, {
						code: "510104",
						name: "锦江区"
					}, {
						code: "510105",
						name: "青羊区"
					}, {
						code: "510106",
						name: "金牛区"
					}, {
						code: "510107",
						name: "武侯区"
					}, {
						code: "510108",
						name: "成华区"
					}, {
						code: "510112",
						name: "龙泉驿区"
					}, {
						code: "510113",
						name: "青白江区"
					}, {
						code: "510114",
						name: "新都区"
					}, {
						code: "510115",
						name: "温江区"
					}, {
						code: "510116",
						name: "双流区"
					}, {
						code: "510121",
						name: "金堂县"
					}, {
						code: "510124",
						name: "郫县"
					}, {
						code: "510129",
						name: "大邑县"
					}, {
						code: "510131",
						name: "蒲江县"
					}, {
						code: "510132",
						name: "新津县"
					}, {
						code: "510181",
						name: "都江堰市"
					}, {
						code: "510182",
						name: "彭州市"
					}, {
						code: "510183",
						name: "邛崃市"
					}, {
						code: "510184",
						name: "崇州市"
					}, {
						code: "510185",
						name: "简阳市"
					}]
				}, {
					code: "510300",
					name: "自贡市",
					children: [{
						code: "510301",
						name: "市辖区"
					}, {
						code: "510302",
						name: "自流井区"
					}, {
						code: "510303",
						name: "贡井区"
					}, {
						code: "510304",
						name: "大安区"
					}, {
						code: "510311",
						name: "沿滩区"
					}, {
						code: "510321",
						name: "荣县"
					}, {
						code: "510322",
						name: "富顺县"
					}]
				}, {
					code: "510400",
					name: "攀枝花市",
					children: [{
						code: "510401",
						name: "市辖区"
					}, {
						code: "510402",
						name: "东区"
					}, {
						code: "510403",
						name: "西区"
					}, {
						code: "510411",
						name: "仁和区"
					}, {
						code: "510421",
						name: "米易县"
					}, {
						code: "510422",
						name: "盐边县"
					}]
				}, {
					code: "510500",
					name: "泸州市",
					children: [{
						code: "510501",
						name: "市辖区"
					}, {
						code: "510502",
						name: "江阳区"
					}, {
						code: "510503",
						name: "纳溪区"
					}, {
						code: "510504",
						name: "龙马潭区"
					}, {
						code: "510521",
						name: "泸县"
					}, {
						code: "510522",
						name: "合江县"
					}, {
						code: "510524",
						name: "叙永县"
					}, {
						code: "510525",
						name: "古蔺县"
					}]
				}, {
					code: "510600",
					name: "德阳市",
					children: [{
						code: "510601",
						name: "市辖区"
					}, {
						code: "510603",
						name: "旌阳区"
					}, {
						code: "510623",
						name: "中江县"
					}, {
						code: "510626",
						name: "罗江县"
					}, {
						code: "510681",
						name: "广汉市"
					}, {
						code: "510682",
						name: "什邡市"
					}, {
						code: "510683",
						name: "绵竹市"
					}]
				}, {
					code: "510700",
					name: "绵阳市",
					children: [{
						code: "510701",
						name: "市辖区"
					}, {
						code: "510703",
						name: "涪城区"
					}, {
						code: "510704",
						name: "游仙区"
					}, {
						code: "510705",
						name: "安州区"
					}, {
						code: "510722",
						name: "三台县"
					}, {
						code: "510723",
						name: "盐亭县"
					}, {
						code: "510725",
						name: "梓潼县"
					}, {
						code: "510726",
						name: "北川羌族自治县"
					}, {
						code: "510727",
						name: "平武县"
					}, {
						code: "510781",
						name: "江油市"
					}]
				}, {
					code: "510800",
					name: "广元市",
					children: [{
						code: "510801",
						name: "市辖区"
					}, {
						code: "510802",
						name: "利州区"
					}, {
						code: "510811",
						name: "昭化区"
					}, {
						code: "510812",
						name: "朝天区"
					}, {
						code: "510821",
						name: "旺苍县"
					}, {
						code: "510822",
						name: "青川县"
					}, {
						code: "510823",
						name: "剑阁县"
					}, {
						code: "510824",
						name: "苍溪县"
					}]
				}, {
					code: "510900",
					name: "遂宁市",
					children: [{
						code: "510901",
						name: "市辖区"
					}, {
						code: "510903",
						name: "船山区"
					}, {
						code: "510904",
						name: "安居区"
					}, {
						code: "510921",
						name: "蓬溪县"
					}, {
						code: "510922",
						name: "射洪县"
					}, {
						code: "510923",
						name: "大英县"
					}]
				}, {
					code: "511000",
					name: "内江市",
					children: [{
						code: "511001",
						name: "市辖区"
					}, {
						code: "511002",
						name: "市中区"
					}, {
						code: "511011",
						name: "东兴区"
					}, {
						code: "511024",
						name: "威远县"
					}, {
						code: "511025",
						name: "资中县"
					}, {
						code: "511028",
						name: "隆昌县"
					}]
				}, {
					code: "511100",
					name: "乐山市",
					children: [{
						code: "511101",
						name: "市辖区"
					}, {
						code: "511102",
						name: "市中区"
					}, {
						code: "511111",
						name: "沙湾区"
					}, {
						code: "511112",
						name: "五通桥区"
					}, {
						code: "511113",
						name: "金口河区"
					}, {
						code: "511123",
						name: "犍为县"
					}, {
						code: "511124",
						name: "井研县"
					}, {
						code: "511126",
						name: "夹江县"
					}, {
						code: "511129",
						name: "沐川县"
					}, {
						code: "511132",
						name: "峨边彝族自治县"
					}, {
						code: "511133",
						name: "马边彝族自治县"
					}, {
						code: "511181",
						name: "峨眉山市"
					}]
				}, {
					code: "511300",
					name: "南充市",
					children: [{
						code: "511301",
						name: "市辖区"
					}, {
						code: "511302",
						name: "顺庆区"
					}, {
						code: "511303",
						name: "高坪区"
					}, {
						code: "511304",
						name: "嘉陵区"
					}, {
						code: "511321",
						name: "南部县"
					}, {
						code: "511322",
						name: "营山县"
					}, {
						code: "511323",
						name: "蓬安县"
					}, {
						code: "511324",
						name: "仪陇县"
					}, {
						code: "511325",
						name: "西充县"
					}, {
						code: "511381",
						name: "阆中市"
					}]
				}, {
					code: "511400",
					name: "眉山市",
					children: [{
						code: "511401",
						name: "市辖区"
					}, {
						code: "511402",
						name: "东坡区"
					}, {
						code: "511403",
						name: "彭山区"
					}, {
						code: "511421",
						name: "仁寿县"
					}, {
						code: "511423",
						name: "洪雅县"
					}, {
						code: "511424",
						name: "丹棱县"
					}, {
						code: "511425",
						name: "青神县"
					}]
				}, {
					code: "511500",
					name: "宜宾市",
					children: [{
						code: "511501",
						name: "市辖区"
					}, {
						code: "511502",
						name: "翠屏区"
					}, {
						code: "511503",
						name: "南溪区"
					}, {
						code: "511521",
						name: "宜宾县"
					}, {
						code: "511523",
						name: "江安县"
					}, {
						code: "511524",
						name: "长宁县"
					}, {
						code: "511525",
						name: "高县"
					}, {
						code: "511526",
						name: "珙县"
					}, {
						code: "511527",
						name: "筠连县"
					}, {
						code: "511528",
						name: "兴文县"
					}, {
						code: "511529",
						name: "屏山县"
					}]
				}, {
					code: "511600",
					name: "广安市",
					children: [{
						code: "511601",
						name: "市辖区"
					}, {
						code: "511602",
						name: "广安区"
					}, {
						code: "511603",
						name: "前锋区"
					}, {
						code: "511621",
						name: "岳池县"
					}, {
						code: "511622",
						name: "武胜县"
					}, {
						code: "511623",
						name: "邻水县"
					}, {
						code: "511681",
						name: "华蓥市"
					}]
				}, {
					code: "511700",
					name: "达州市",
					children: [{
						code: "511701",
						name: "市辖区"
					}, {
						code: "511702",
						name: "通川区"
					}, {
						code: "511703",
						name: "达川区"
					}, {
						code: "511722",
						name: "宣汉县"
					}, {
						code: "511723",
						name: "开江县"
					}, {
						code: "511724",
						name: "大竹县"
					}, {
						code: "511725",
						name: "渠县"
					}, {
						code: "511781",
						name: "万源市"
					}]
				}, {
					code: "511800",
					name: "雅安市",
					children: [{
						code: "511801",
						name: "市辖区"
					}, {
						code: "511802",
						name: "雨城区"
					}, {
						code: "511803",
						name: "名山区"
					}, {
						code: "511822",
						name: "荥经县"
					}, {
						code: "511823",
						name: "汉源县"
					}, {
						code: "511824",
						name: "石棉县"
					}, {
						code: "511825",
						name: "天全县"
					}, {
						code: "511826",
						name: "芦山县"
					}, {
						code: "511827",
						name: "宝兴县"
					}]
				}, {
					code: "511900",
					name: "巴中市",
					children: [{
						code: "511901",
						name: "市辖区"
					}, {
						code: "511902",
						name: "巴州区"
					}, {
						code: "511903",
						name: "恩阳区"
					}, {
						code: "511921",
						name: "通江县"
					}, {
						code: "511922",
						name: "南江县"
					}, {
						code: "511923",
						name: "平昌县"
					}]
				}, {
					code: "512000",
					name: "资阳市",
					children: [{
						code: "512001",
						name: "市辖区"
					}, {
						code: "512002",
						name: "雁江区"
					}, {
						code: "512021",
						name: "安岳县"
					}, {
						code: "512022",
						name: "乐至县"
					}]
				}, {
					code: "513200",
					name: "阿坝藏族羌族自治州",
					children: [{
						code: "513201",
						name: "马尔康市"
					}, {
						code: "513221",
						name: "汶川县"
					}, {
						code: "513222",
						name: "理县"
					}, {
						code: "513223",
						name: "茂县"
					}, {
						code: "513224",
						name: "松潘县"
					}, {
						code: "513225",
						name: "九寨沟县"
					}, {
						code: "513226",
						name: "金川县"
					}, {
						code: "513227",
						name: "小金县"
					}, {
						code: "513228",
						name: "黑水县"
					}, {
						code: "513230",
						name: "壤塘县"
					}, {
						code: "513231",
						name: "阿坝县"
					}, {
						code: "513232",
						name: "若尔盖县"
					}, {
						code: "513233",
						name: "红原县"
					}]
				}, {
					code: "513300",
					name: "甘孜藏族自治州",
					children: [{
						code: "513301",
						name: "康定市"
					}, {
						code: "513322",
						name: "泸定县"
					}, {
						code: "513323",
						name: "丹巴县"
					}, {
						code: "513324",
						name: "九龙县"
					}, {
						code: "513325",
						name: "雅江县"
					}, {
						code: "513326",
						name: "道孚县"
					}, {
						code: "513327",
						name: "炉霍县"
					}, {
						code: "513328",
						name: "甘孜县"
					}, {
						code: "513329",
						name: "新龙县"
					}, {
						code: "513330",
						name: "德格县"
					}, {
						code: "513331",
						name: "白玉县"
					}, {
						code: "513332",
						name: "石渠县"
					}, {
						code: "513333",
						name: "色达县"
					}, {
						code: "513334",
						name: "理塘县"
					}, {
						code: "513335",
						name: "巴塘县"
					}, {
						code: "513336",
						name: "乡城县"
					}, {
						code: "513337",
						name: "稻城县"
					}, {
						code: "513338",
						name: "得荣县"
					}]
				}, {
					code: "513400",
					name: "凉山彝族自治州",
					children: [{
						code: "513401",
						name: "西昌市"
					}, {
						code: "513422",
						name: "木里藏族自治县"
					}, {
						code: "513423",
						name: "盐源县"
					}, {
						code: "513424",
						name: "德昌县"
					}, {
						code: "513425",
						name: "会理县"
					}, {
						code: "513426",
						name: "会东县"
					}, {
						code: "513427",
						name: "宁南县"
					}, {
						code: "513428",
						name: "普格县"
					}, {
						code: "513429",
						name: "布拖县"
					}, {
						code: "513430",
						name: "金阳县"
					}, {
						code: "513431",
						name: "昭觉县"
					}, {
						code: "513432",
						name: "喜德县"
					}, {
						code: "513433",
						name: "冕宁县"
					}, {
						code: "513434",
						name: "越西县"
					}, {
						code: "513435",
						name: "甘洛县"
					}, {
						code: "513436",
						name: "美姑县"
					}, {
						code: "513437",
						name: "雷波县"
					}]
				}]
			}, {
				code: "520000",
				name: "贵州省",
				children: [{
					code: "520100",
					name: "贵阳市",
					children: [{
						code: "520101",
						name: "市辖区"
					}, {
						code: "520102",
						name: "南明区"
					}, {
						code: "520103",
						name: "云岩区"
					}, {
						code: "520111",
						name: "花溪区"
					}, {
						code: "520112",
						name: "乌当区"
					}, {
						code: "520113",
						name: "白云区"
					}, {
						code: "520115",
						name: "观山湖区"
					}, {
						code: "520121",
						name: "开阳县"
					}, {
						code: "520122",
						name: "息烽县"
					}, {
						code: "520123",
						name: "修文县"
					}, {
						code: "520181",
						name: "清镇市"
					}]
				}, {
					code: "520200",
					name: "六盘水市",
					children: [{
						code: "520201",
						name: "钟山区"
					}, {
						code: "520203",
						name: "六枝特区"
					}, {
						code: "520221",
						name: "水城县"
					}, {
						code: "520222",
						name: "盘县"
					}]
				}, {
					code: "520300",
					name: "遵义市",
					children: [{
						code: "520301",
						name: "市辖区"
					}, {
						code: "520302",
						name: "红花岗区"
					}, {
						code: "520303",
						name: "汇川区"
					}, {
						code: "520304",
						name: "播州区"
					}, {
						code: "520322",
						name: "桐梓县"
					}, {
						code: "520323",
						name: "绥阳县"
					}, {
						code: "520324",
						name: "正安县"
					}, {
						code: "520325",
						name: "道真仡佬族苗族自治县"
					}, {
						code: "520326",
						name: "务川仡佬族苗族自治县"
					}, {
						code: "520327",
						name: "凤冈县"
					}, {
						code: "520328",
						name: "湄潭县"
					}, {
						code: "520329",
						name: "余庆县"
					}, {
						code: "520330",
						name: "习水县"
					}, {
						code: "520381",
						name: "赤水市"
					}, {
						code: "520382",
						name: "仁怀市"
					}]
				}, {
					code: "520400",
					name: "安顺市",
					children: [{
						code: "520401",
						name: "市辖区"
					}, {
						code: "520402",
						name: "西秀区"
					}, {
						code: "520403",
						name: "平坝区"
					}, {
						code: "520422",
						name: "普定县"
					}, {
						code: "520423",
						name: "镇宁布依族苗族自治县"
					}, {
						code: "520424",
						name: "关岭布依族苗族自治县"
					}, {
						code: "520425",
						name: "紫云苗族布依族自治县"
					}]
				}, {
					code: "520500",
					name: "毕节市",
					children: [{
						code: "520501",
						name: "市辖区"
					}, {
						code: "520502",
						name: "七星关区"
					}, {
						code: "520521",
						name: "大方县"
					}, {
						code: "520522",
						name: "黔西县"
					}, {
						code: "520523",
						name: "金沙县"
					}, {
						code: "520524",
						name: "织金县"
					}, {
						code: "520525",
						name: "纳雍县"
					}, {
						code: "520526",
						name: "威宁彝族回族苗族自治县"
					}, {
						code: "520527",
						name: "赫章县"
					}]
				}, {
					code: "520600",
					name: "铜仁市",
					children: [{
						code: "520601",
						name: "市辖区"
					}, {
						code: "520602",
						name: "碧江区"
					}, {
						code: "520603",
						name: "万山区"
					}, {
						code: "520621",
						name: "江口县"
					}, {
						code: "520622",
						name: "玉屏侗族自治县"
					}, {
						code: "520623",
						name: "石阡县"
					}, {
						code: "520624",
						name: "思南县"
					}, {
						code: "520625",
						name: "印江土家族苗族自治县"
					}, {
						code: "520626",
						name: "德江县"
					}, {
						code: "520627",
						name: "沿河土家族自治县"
					}, {
						code: "520628",
						name: "松桃苗族自治县"
					}]
				}, {
					code: "522300",
					name: "黔西南布依族苗族自治州",
					children: [{
						code: "522301",
						name: "兴义市"
					}, {
						code: "522322",
						name: "兴仁县"
					}, {
						code: "522323",
						name: "普安县"
					}, {
						code: "522324",
						name: "晴隆县"
					}, {
						code: "522325",
						name: "贞丰县"
					}, {
						code: "522326",
						name: "望谟县"
					}, {
						code: "522327",
						name: "册亨县"
					}, {
						code: "522328",
						name: "安龙县"
					}]
				}, {
					code: "522600",
					name: "黔东南苗族侗族自治州",
					children: [{
						code: "522601",
						name: "凯里市"
					}, {
						code: "522622",
						name: "黄平县"
					}, {
						code: "522623",
						name: "施秉县"
					}, {
						code: "522624",
						name: "三穗县"
					}, {
						code: "522625",
						name: "镇远县"
					}, {
						code: "522626",
						name: "岑巩县"
					}, {
						code: "522627",
						name: "天柱县"
					}, {
						code: "522628",
						name: "锦屏县"
					}, {
						code: "522629",
						name: "剑河县"
					}, {
						code: "522630",
						name: "台江县"
					}, {
						code: "522631",
						name: "黎平县"
					}, {
						code: "522632",
						name: "榕江县"
					}, {
						code: "522633",
						name: "从江县"
					}, {
						code: "522634",
						name: "雷山县"
					}, {
						code: "522635",
						name: "麻江县"
					}, {
						code: "522636",
						name: "丹寨县"
					}]
				}, {
					code: "522700",
					name: "黔南布依族苗族自治州",
					children: [{
						code: "522701",
						name: "都匀市"
					}, {
						code: "522702",
						name: "福泉市"
					}, {
						code: "522722",
						name: "荔波县"
					}, {
						code: "522723",
						name: "贵定县"
					}, {
						code: "522725",
						name: "瓮安县"
					}, {
						code: "522726",
						name: "独山县"
					}, {
						code: "522727",
						name: "平塘县"
					}, {
						code: "522728",
						name: "罗甸县"
					}, {
						code: "522729",
						name: "长顺县"
					}, {
						code: "522730",
						name: "龙里县"
					}, {
						code: "522731",
						name: "惠水县"
					}, {
						code: "522732",
						name: "三都水族自治县"
					}]
				}]
			}, {
				code: "530000",
				name: "云南省",
				children: [{
					code: "530100",
					name: "昆明市",
					children: [{
						code: "530101",
						name: "市辖区"
					}, {
						code: "530102",
						name: "五华区"
					}, {
						code: "530103",
						name: "盘龙区"
					}, {
						code: "530111",
						name: "官渡区"
					}, {
						code: "530112",
						name: "西山区"
					}, {
						code: "530113",
						name: "东川区"
					}, {
						code: "530114",
						name: "呈贡区"
					}, {
						code: "530122",
						name: "晋宁县"
					}, {
						code: "530124",
						name: "富民县"
					}, {
						code: "530125",
						name: "宜良县"
					}, {
						code: "530126",
						name: "石林彝族自治县"
					}, {
						code: "530127",
						name: "嵩明县"
					}, {
						code: "530128",
						name: "禄劝彝族苗族自治县"
					}, {
						code: "530129",
						name: "寻甸回族彝族自治县"
					}, {
						code: "530181",
						name: "安宁市"
					}]
				}, {
					code: "530300",
					name: "曲靖市",
					children: [{
						code: "530301",
						name: "市辖区"
					}, {
						code: "530302",
						name: "麒麟区"
					}, {
						code: "530303",
						name: "沾益区"
					}, {
						code: "530321",
						name: "马龙县"
					}, {
						code: "530322",
						name: "陆良县"
					}, {
						code: "530323",
						name: "师宗县"
					}, {
						code: "530324",
						name: "罗平县"
					}, {
						code: "530325",
						name: "富源县"
					}, {
						code: "530326",
						name: "会泽县"
					}, {
						code: "530381",
						name: "宣威市"
					}]
				}, {
					code: "530400",
					name: "玉溪市",
					children: [{
						code: "530401",
						name: "市辖区"
					}, {
						code: "530402",
						name: "红塔区"
					}, {
						code: "530403",
						name: "江川区"
					}, {
						code: "530422",
						name: "澄江县"
					}, {
						code: "530423",
						name: "通海县"
					}, {
						code: "530424",
						name: "华宁县"
					}, {
						code: "530425",
						name: "易门县"
					}, {
						code: "530426",
						name: "峨山彝族自治县"
					}, {
						code: "530427",
						name: "新平彝族傣族自治县"
					}, {
						code: "530428",
						name: "元江哈尼族彝族傣族自治县"
					}]
				}, {
					code: "530500",
					name: "保山市",
					children: [{
						code: "530501",
						name: "市辖区"
					}, {
						code: "530502",
						name: "隆阳区"
					}, {
						code: "530521",
						name: "施甸县"
					}, {
						code: "530523",
						name: "龙陵县"
					}, {
						code: "530524",
						name: "昌宁县"
					}, {
						code: "530581",
						name: "腾冲市"
					}]
				}, {
					code: "530600",
					name: "昭通市",
					children: [{
						code: "530601",
						name: "市辖区"
					}, {
						code: "530602",
						name: "昭阳区"
					}, {
						code: "530621",
						name: "鲁甸县"
					}, {
						code: "530622",
						name: "巧家县"
					}, {
						code: "530623",
						name: "盐津县"
					}, {
						code: "530624",
						name: "大关县"
					}, {
						code: "530625",
						name: "永善县"
					}, {
						code: "530626",
						name: "绥江县"
					}, {
						code: "530627",
						name: "镇雄县"
					}, {
						code: "530628",
						name: "彝良县"
					}, {
						code: "530629",
						name: "威信县"
					}, {
						code: "530630",
						name: "水富县"
					}]
				}, {
					code: "530700",
					name: "丽江市",
					children: [{
						code: "530701",
						name: "市辖区"
					}, {
						code: "530702",
						name: "古城区"
					}, {
						code: "530721",
						name: "玉龙纳西族自治县"
					}, {
						code: "530722",
						name: "永胜县"
					}, {
						code: "530723",
						name: "华坪县"
					}, {
						code: "530724",
						name: "宁蒗彝族自治县"
					}]
				}, {
					code: "530800",
					name: "普洱市",
					children: [{
						code: "530801",
						name: "市辖区"
					}, {
						code: "530802",
						name: "思茅区"
					}, {
						code: "530821",
						name: "宁洱哈尼族彝族自治县"
					}, {
						code: "530822",
						name: "墨江哈尼族自治县"
					}, {
						code: "530823",
						name: "景东彝族自治县"
					}, {
						code: "530824",
						name: "景谷傣族彝族自治县"
					}, {
						code: "530825",
						name: "镇沅彝族哈尼族拉祜族自治县"
					}, {
						code: "530826",
						name: "江城哈尼族彝族自治县"
					}, {
						code: "530827",
						name: "孟连傣族拉祜族佤族自治县"
					}, {
						code: "530828",
						name: "澜沧拉祜族自治县"
					}, {
						code: "530829",
						name: "西盟佤族自治县"
					}]
				}, {
					code: "530900",
					name: "临沧市",
					children: [{
						code: "530901",
						name: "市辖区"
					}, {
						code: "530902",
						name: "临翔区"
					}, {
						code: "530921",
						name: "凤庆县"
					}, {
						code: "530922",
						name: "云县"
					}, {
						code: "530923",
						name: "永德县"
					}, {
						code: "530924",
						name: "镇康县"
					}, {
						code: "530925",
						name: "双江拉祜族佤族布朗族傣族自治县"
					}, {
						code: "530926",
						name: "耿马傣族佤族自治县"
					}, {
						code: "530927",
						name: "沧源佤族自治县"
					}]
				}, {
					code: "532300",
					name: "楚雄彝族自治州",
					children: [{
						code: "532301",
						name: "楚雄市"
					}, {
						code: "532322",
						name: "双柏县"
					}, {
						code: "532323",
						name: "牟定县"
					}, {
						code: "532324",
						name: "南华县"
					}, {
						code: "532325",
						name: "姚安县"
					}, {
						code: "532326",
						name: "大姚县"
					}, {
						code: "532327",
						name: "永仁县"
					}, {
						code: "532328",
						name: "元谋县"
					}, {
						code: "532329",
						name: "武定县"
					}, {
						code: "532331",
						name: "禄丰县"
					}]
				}, {
					code: "532500",
					name: "红河哈尼族彝族自治州",
					children: [{
						code: "532501",
						name: "个旧市"
					}, {
						code: "532502",
						name: "开远市"
					}, {
						code: "532503",
						name: "蒙自市"
					}, {
						code: "532504",
						name: "弥勒市"
					}, {
						code: "532523",
						name: "屏边苗族自治县"
					}, {
						code: "532524",
						name: "建水县"
					}, {
						code: "532525",
						name: "石屏县"
					}, {
						code: "532527",
						name: "泸西县"
					}, {
						code: "532528",
						name: "元阳县"
					}, {
						code: "532529",
						name: "红河县"
					}, {
						code: "532530",
						name: "金平苗族瑶族傣族自治县"
					}, {
						code: "532531",
						name: "绿春县"
					}, {
						code: "532532",
						name: "河口瑶族自治县"
					}]
				}, {
					code: "532600",
					name: "文山壮族苗族自治州",
					children: [{
						code: "532601",
						name: "文山市"
					}, {
						code: "532622",
						name: "砚山县"
					}, {
						code: "532623",
						name: "西畴县"
					}, {
						code: "532624",
						name: "麻栗坡县"
					}, {
						code: "532625",
						name: "马关县"
					}, {
						code: "532626",
						name: "丘北县"
					}, {
						code: "532627",
						name: "广南县"
					}, {
						code: "532628",
						name: "富宁县"
					}]
				}, {
					code: "532800",
					name: "西双版纳傣族自治州",
					children: [{
						code: "532801",
						name: "景洪市"
					}, {
						code: "532822",
						name: "勐海县"
					}, {
						code: "532823",
						name: "勐腊县"
					}]
				}, {
					code: "532900",
					name: "大理白族自治州",
					children: [{
						code: "532901",
						name: "大理市"
					}, {
						code: "532922",
						name: "漾濞彝族自治县"
					}, {
						code: "532923",
						name: "祥云县"
					}, {
						code: "532924",
						name: "宾川县"
					}, {
						code: "532925",
						name: "弥渡县"
					}, {
						code: "532926",
						name: "南涧彝族自治县"
					}, {
						code: "532927",
						name: "巍山彝族回族自治县"
					}, {
						code: "532928",
						name: "永平县"
					}, {
						code: "532929",
						name: "云龙县"
					}, {
						code: "532930",
						name: "洱源县"
					}, {
						code: "532931",
						name: "剑川县"
					}, {
						code: "532932",
						name: "鹤庆县"
					}]
				}, {
					code: "533100",
					name: "德宏傣族景颇族自治州",
					children: [{
						code: "533102",
						name: "瑞丽市"
					}, {
						code: "533103",
						name: "芒市"
					}, {
						code: "533122",
						name: "梁河县"
					}, {
						code: "533123",
						name: "盈江县"
					}, {
						code: "533124",
						name: "陇川县"
					}]
				}, {
					code: "533300",
					name: "怒江傈僳族自治州",
					children: [{
						code: "533301",
						name: "泸水市"
					}, {
						code: "533323",
						name: "福贡县"
					}, {
						code: "533324",
						name: "贡山独龙族怒族自治县"
					}, {
						code: "533325",
						name: "兰坪白族普米族自治县"
					}]
				}, {
					code: "533400",
					name: "迪庆藏族自治州",
					children: [{
						code: "533401",
						name: "香格里拉市"
					}, {
						code: "533422",
						name: "德钦县"
					}, {
						code: "533423",
						name: "维西傈僳族自治县"
					}]
				}]
			}, {
				code: "540000",
				name: "西藏自治区",
				children: [{
					code: "540100",
					name: "拉萨市",
					children: [{
						code: "540101",
						name: "市辖区"
					}, {
						code: "540102",
						name: "城关区"
					}, {
						code: "540103",
						name: "堆龙德庆区"
					}, {
						code: "540121",
						name: "林周县"
					}, {
						code: "540122",
						name: "当雄县"
					}, {
						code: "540123",
						name: "尼木县"
					}, {
						code: "540124",
						name: "曲水县"
					}, {
						code: "540126",
						name: "达孜县"
					}, {
						code: "540127",
						name: "墨竹工卡县"
					}]
				}, {
					code: "540200",
					name: "日喀则市",
					children: [{
						code: "540202",
						name: "桑珠孜区"
					}, {
						code: "540221",
						name: "南木林县"
					}, {
						code: "540222",
						name: "江孜县"
					}, {
						code: "540223",
						name: "定日县"
					}, {
						code: "540224",
						name: "萨迦县"
					}, {
						code: "540225",
						name: "拉孜县"
					}, {
						code: "540226",
						name: "昂仁县"
					}, {
						code: "540227",
						name: "谢通门县"
					}, {
						code: "540228",
						name: "白朗县"
					}, {
						code: "540229",
						name: "仁布县"
					}, {
						code: "540230",
						name: "康马县"
					}, {
						code: "540231",
						name: "定结县"
					}, {
						code: "540232",
						name: "仲巴县"
					}, {
						code: "540233",
						name: "亚东县"
					}, {
						code: "540234",
						name: "吉隆县"
					}, {
						code: "540235",
						name: "聂拉木县"
					}, {
						code: "540236",
						name: "萨嘎县"
					}, {
						code: "540237",
						name: "岗巴县"
					}]
				}, {
					code: "540300",
					name: "昌都市",
					children: [{
						code: "540302",
						name: "卡若区"
					}, {
						code: "540321",
						name: "江达县"
					}, {
						code: "540322",
						name: "贡觉县"
					}, {
						code: "540323",
						name: "类乌齐县"
					}, {
						code: "540324",
						name: "丁青县"
					}, {
						code: "540325",
						name: "察雅县"
					}, {
						code: "540326",
						name: "八宿县"
					}, {
						code: "540327",
						name: "左贡县"
					}, {
						code: "540328",
						name: "芒康县"
					}, {
						code: "540329",
						name: "洛隆县"
					}, {
						code: "540330",
						name: "边坝县"
					}]
				}, {
					code: "540400",
					name: "林芝市",
					children: [{
						code: "540402",
						name: "巴宜区"
					}, {
						code: "540421",
						name: "工布江达县"
					}, {
						code: "540422",
						name: "米林县"
					}, {
						code: "540423",
						name: "墨脱县"
					}, {
						code: "540424",
						name: "波密县"
					}, {
						code: "540425",
						name: "察隅县"
					}, {
						code: "540426",
						name: "朗县"
					}]
				}, {
					code: "540500",
					name: "山南市",
					children: [{
						code: "540501",
						name: "市辖区"
					}, {
						code: "540502",
						name: "乃东区"
					}, {
						code: "540521",
						name: "扎囊县"
					}, {
						code: "540522",
						name: "贡嘎县"
					}, {
						code: "540523",
						name: "桑日县"
					}, {
						code: "540524",
						name: "琼结县"
					}, {
						code: "540525",
						name: "曲松县"
					}, {
						code: "540526",
						name: "措美县"
					}, {
						code: "540527",
						name: "洛扎县"
					}, {
						code: "540528",
						name: "加查县"
					}, {
						code: "540529",
						name: "隆子县"
					}, {
						code: "540530",
						name: "错那县"
					}, {
						code: "540531",
						name: "浪卡子县"
					}]
				}, {
					code: "542400",
					name: "那曲地区",
					children: [{
						code: "542421",
						name: "那曲县"
					}, {
						code: "542422",
						name: "嘉黎县"
					}, {
						code: "542423",
						name: "比如县"
					}, {
						code: "542424",
						name: "聂荣县"
					}, {
						code: "542425",
						name: "安多县"
					}, {
						code: "542426",
						name: "申扎县"
					}, {
						code: "542427",
						name: "索县"
					}, {
						code: "542428",
						name: "班戈县"
					}, {
						code: "542429",
						name: "巴青县"
					}, {
						code: "542430",
						name: "尼玛县"
					}, {
						code: "542431",
						name: "双湖县"
					}]
				}, {
					code: "542500",
					name: "阿里地区",
					children: [{
						code: "542521",
						name: "普兰县"
					}, {
						code: "542522",
						name: "札达县"
					}, {
						code: "542523",
						name: "噶尔县"
					}, {
						code: "542524",
						name: "日土县"
					}, {
						code: "542525",
						name: "革吉县"
					}, {
						code: "542526",
						name: "改则县"
					}, {
						code: "542527",
						name: "措勤县"
					}]
				}]
			}, {
				code: "610000",
				name: "陕西省",
				children: [{
					code: "610100",
					name: "西安市",
					children: [{
						code: "610101",
						name: "市辖区"
					}, {
						code: "610102",
						name: "新城区"
					}, {
						code: "610103",
						name: "碑林区"
					}, {
						code: "610104",
						name: "莲湖区"
					}, {
						code: "610111",
						name: "灞桥区"
					}, {
						code: "610112",
						name: "未央区"
					}, {
						code: "610113",
						name: "雁塔区"
					}, {
						code: "610114",
						name: "阎良区"
					}, {
						code: "610115",
						name: "临潼区"
					}, {
						code: "610116",
						name: "长安区"
					}, {
						code: "610117",
						name: "高陵区"
					}, {
						code: "610122",
						name: "蓝田县"
					}, {
						code: "610124",
						name: "周至县"
					}, {
						code: "610125",
						name: "户县"
					}]
				}, {
					code: "610200",
					name: "铜川市",
					children: [{
						code: "610201",
						name: "市辖区"
					}, {
						code: "610202",
						name: "王益区"
					}, {
						code: "610203",
						name: "印台区"
					}, {
						code: "610204",
						name: "耀州区"
					}, {
						code: "610222",
						name: "宜君县"
					}]
				}, {
					code: "610300",
					name: "宝鸡市",
					children: [{
						code: "610301",
						name: "市辖区"
					}, {
						code: "610302",
						name: "渭滨区"
					}, {
						code: "610303",
						name: "金台区"
					}, {
						code: "610304",
						name: "陈仓区"
					}, {
						code: "610322",
						name: "凤翔县"
					}, {
						code: "610323",
						name: "岐山县"
					}, {
						code: "610324",
						name: "扶风县"
					}, {
						code: "610326",
						name: "眉县"
					}, {
						code: "610327",
						name: "陇县"
					}, {
						code: "610328",
						name: "千阳县"
					}, {
						code: "610329",
						name: "麟游县"
					}, {
						code: "610330",
						name: "凤县"
					}, {
						code: "610331",
						name: "太白县"
					}]
				}, {
					code: "610400",
					name: "咸阳市",
					children: [{
						code: "610401",
						name: "市辖区"
					}, {
						code: "610402",
						name: "秦都区"
					}, {
						code: "610403",
						name: "杨陵区"
					}, {
						code: "610404",
						name: "渭城区"
					}, {
						code: "610422",
						name: "三原县"
					}, {
						code: "610423",
						name: "泾阳县"
					}, {
						code: "610424",
						name: "乾县"
					}, {
						code: "610425",
						name: "礼泉县"
					}, {
						code: "610426",
						name: "永寿县"
					}, {
						code: "610427",
						name: "彬县"
					}, {
						code: "610428",
						name: "长武县"
					}, {
						code: "610429",
						name: "旬邑县"
					}, {
						code: "610430",
						name: "淳化县"
					}, {
						code: "610431",
						name: "武功县"
					}, {
						code: "610481",
						name: "兴平市"
					}]
				}, {
					code: "610500",
					name: "渭南市",
					children: [{
						code: "610501",
						name: "市辖区"
					}, {
						code: "610502",
						name: "临渭区"
					}, {
						code: "610503",
						name: "华州区"
					}, {
						code: "610522",
						name: "潼关县"
					}, {
						code: "610523",
						name: "大荔县"
					}, {
						code: "610524",
						name: "合阳县"
					}, {
						code: "610525",
						name: "澄城县"
					}, {
						code: "610526",
						name: "蒲城县"
					}, {
						code: "610527",
						name: "白水县"
					}, {
						code: "610528",
						name: "富平县"
					}, {
						code: "610581",
						name: "韩城市"
					}, {
						code: "610582",
						name: "华阴市"
					}]
				}, {
					code: "610600",
					name: "延安市",
					children: [{
						code: "610601",
						name: "市辖区"
					}, {
						code: "610602",
						name: "宝塔区"
					}, {
						code: "610603",
						name: "安塞区"
					}, {
						code: "610621",
						name: "延长县"
					}, {
						code: "610622",
						name: "延川县"
					}, {
						code: "610623",
						name: "子长县"
					}, {
						code: "610625",
						name: "志丹县"
					}, {
						code: "610626",
						name: "吴起县"
					}, {
						code: "610627",
						name: "甘泉县"
					}, {
						code: "610628",
						name: "富县"
					}, {
						code: "610629",
						name: "洛川县"
					}, {
						code: "610630",
						name: "宜川县"
					}, {
						code: "610631",
						name: "黄龙县"
					}, {
						code: "610632",
						name: "黄陵县"
					}]
				}, {
					code: "610700",
					name: "汉中市",
					children: [{
						code: "610701",
						name: "市辖区"
					}, {
						code: "610702",
						name: "汉台区"
					}, {
						code: "610721",
						name: "南郑县"
					}, {
						code: "610722",
						name: "城固县"
					}, {
						code: "610723",
						name: "洋县"
					}, {
						code: "610724",
						name: "西乡县"
					}, {
						code: "610725",
						name: "勉县"
					}, {
						code: "610726",
						name: "宁强县"
					}, {
						code: "610727",
						name: "略阳县"
					}, {
						code: "610728",
						name: "镇巴县"
					}, {
						code: "610729",
						name: "留坝县"
					}, {
						code: "610730",
						name: "佛坪县"
					}]
				}, {
					code: "610800",
					name: "榆林市",
					children: [{
						code: "610801",
						name: "市辖区"
					}, {
						code: "610802",
						name: "榆阳区"
					}, {
						code: "610803",
						name: "横山区"
					}, {
						code: "610821",
						name: "神木县"
					}, {
						code: "610822",
						name: "府谷县"
					}, {
						code: "610824",
						name: "靖边县"
					}, {
						code: "610825",
						name: "定边县"
					}, {
						code: "610826",
						name: "绥德县"
					}, {
						code: "610827",
						name: "米脂县"
					}, {
						code: "610828",
						name: "佳县"
					}, {
						code: "610829",
						name: "吴堡县"
					}, {
						code: "610830",
						name: "清涧县"
					}, {
						code: "610831",
						name: "子洲县"
					}]
				}, {
					code: "610900",
					name: "安康市",
					children: [{
						code: "610901",
						name: "市辖区"
					}, {
						code: "610902",
						name: "汉滨区"
					}, {
						code: "610921",
						name: "汉阴县"
					}, {
						code: "610922",
						name: "石泉县"
					}, {
						code: "610923",
						name: "宁陕县"
					}, {
						code: "610924",
						name: "紫阳县"
					}, {
						code: "610925",
						name: "岚皋县"
					}, {
						code: "610926",
						name: "平利县"
					}, {
						code: "610927",
						name: "镇坪县"
					}, {
						code: "610928",
						name: "旬阳县"
					}, {
						code: "610929",
						name: "白河县"
					}]
				}, {
					code: "611000",
					name: "商洛市",
					children: [{
						code: "611001",
						name: "市辖区"
					}, {
						code: "611002",
						name: "商州区"
					}, {
						code: "611021",
						name: "洛南县"
					}, {
						code: "611022",
						name: "丹凤县"
					}, {
						code: "611023",
						name: "商南县"
					}, {
						code: "611024",
						name: "山阳县"
					}, {
						code: "611025",
						name: "镇安县"
					}, {
						code: "611026",
						name: "柞水县"
					}]
				}]
			}, {
				code: "620000",
				name: "甘肃省",
				children: [{
					code: "620100",
					name: "兰州市",
					children: [{
						code: "620101",
						name: "市辖区"
					}, {
						code: "620102",
						name: "城关区"
					}, {
						code: "620103",
						name: "七里河区"
					}, {
						code: "620104",
						name: "西固区"
					}, {
						code: "620105",
						name: "安宁区"
					}, {
						code: "620111",
						name: "红古区"
					}, {
						code: "620121",
						name: "永登县"
					}, {
						code: "620122",
						name: "皋兰县"
					}, {
						code: "620123",
						name: "榆中县"
					}]
				}, {
					code: "620200",
					name: "嘉峪关市",
					children: [{
						code: "620201",
						name: "市辖区"
					}]
				}, {
					code: "620300",
					name: "金昌市",
					children: [{
						code: "620301",
						name: "市辖区"
					}, {
						code: "620302",
						name: "金川区"
					}, {
						code: "620321",
						name: "永昌县"
					}]
				}, {
					code: "620400",
					name: "白银市",
					children: [{
						code: "620401",
						name: "市辖区"
					}, {
						code: "620402",
						name: "白银区"
					}, {
						code: "620403",
						name: "平川区"
					}, {
						code: "620421",
						name: "靖远县"
					}, {
						code: "620422",
						name: "会宁县"
					}, {
						code: "620423",
						name: "景泰县"
					}]
				}, {
					code: "620500",
					name: "天水市",
					children: [{
						code: "620501",
						name: "市辖区"
					}, {
						code: "620502",
						name: "秦州区"
					}, {
						code: "620503",
						name: "麦积区"
					}, {
						code: "620521",
						name: "清水县"
					}, {
						code: "620522",
						name: "秦安县"
					}, {
						code: "620523",
						name: "甘谷县"
					}, {
						code: "620524",
						name: "武山县"
					}, {
						code: "620525",
						name: "张家川回族自治县"
					}]
				}, {
					code: "620600",
					name: "武威市",
					children: [{
						code: "620601",
						name: "市辖区"
					}, {
						code: "620602",
						name: "凉州区"
					}, {
						code: "620621",
						name: "民勤县"
					}, {
						code: "620622",
						name: "古浪县"
					}, {
						code: "620623",
						name: "天祝藏族自治县"
					}]
				}, {
					code: "620700",
					name: "张掖市",
					children: [{
						code: "620701",
						name: "市辖区"
					}, {
						code: "620702",
						name: "甘州区"
					}, {
						code: "620721",
						name: "肃南裕固族自治县"
					}, {
						code: "620722",
						name: "民乐县"
					}, {
						code: "620723",
						name: "临泽县"
					}, {
						code: "620724",
						name: "高台县"
					}, {
						code: "620725",
						name: "山丹县"
					}]
				}, {
					code: "620800",
					name: "平凉市",
					children: [{
						code: "620801",
						name: "市辖区"
					}, {
						code: "620802",
						name: "崆峒区"
					}, {
						code: "620821",
						name: "泾川县"
					}, {
						code: "620822",
						name: "灵台县"
					}, {
						code: "620823",
						name: "崇信县"
					}, {
						code: "620824",
						name: "华亭县"
					}, {
						code: "620825",
						name: "庄浪县"
					}, {
						code: "620826",
						name: "静宁县"
					}]
				}, {
					code: "620900",
					name: "酒泉市",
					children: [{
						code: "620901",
						name: "市辖区"
					}, {
						code: "620902",
						name: "肃州区"
					}, {
						code: "620921",
						name: "金塔县"
					}, {
						code: "620922",
						name: "瓜州县"
					}, {
						code: "620923",
						name: "肃北蒙古族自治县"
					}, {
						code: "620924",
						name: "阿克塞哈萨克族自治县"
					}, {
						code: "620981",
						name: "玉门市"
					}, {
						code: "620982",
						name: "敦煌市"
					}]
				}, {
					code: "621000",
					name: "庆阳市",
					children: [{
						code: "621001",
						name: "市辖区"
					}, {
						code: "621002",
						name: "西峰区"
					}, {
						code: "621021",
						name: "庆城县"
					}, {
						code: "621022",
						name: "环县"
					}, {
						code: "621023",
						name: "华池县"
					}, {
						code: "621024",
						name: "合水县"
					}, {
						code: "621025",
						name: "正宁县"
					}, {
						code: "621026",
						name: "宁县"
					}, {
						code: "621027",
						name: "镇原县"
					}]
				}, {
					code: "621100",
					name: "定西市",
					children: [{
						code: "621101",
						name: "市辖区"
					}, {
						code: "621102",
						name: "安定区"
					}, {
						code: "621121",
						name: "通渭县"
					}, {
						code: "621122",
						name: "陇西县"
					}, {
						code: "621123",
						name: "渭源县"
					}, {
						code: "621124",
						name: "临洮县"
					}, {
						code: "621125",
						name: "漳县"
					}, {
						code: "621126",
						name: "岷县"
					}]
				}, {
					code: "621200",
					name: "陇南市",
					children: [{
						code: "621201",
						name: "市辖区"
					}, {
						code: "621202",
						name: "武都区"
					}, {
						code: "621221",
						name: "成县"
					}, {
						code: "621222",
						name: "文县"
					}, {
						code: "621223",
						name: "宕昌县"
					}, {
						code: "621224",
						name: "康县"
					}, {
						code: "621225",
						name: "西和县"
					}, {
						code: "621226",
						name: "礼县"
					}, {
						code: "621227",
						name: "徽县"
					}, {
						code: "621228",
						name: "两当县"
					}]
				}, {
					code: "622900",
					name: "临夏回族自治州",
					children: [{
						code: "622901",
						name: "临夏市"
					}, {
						code: "622921",
						name: "临夏县"
					}, {
						code: "622922",
						name: "康乐县"
					}, {
						code: "622923",
						name: "永靖县"
					}, {
						code: "622924",
						name: "广河县"
					}, {
						code: "622925",
						name: "和政县"
					}, {
						code: "622926",
						name: "东乡族自治县"
					}, {
						code: "622927",
						name: "积石山保安族东乡族撒拉族自治县"
					}]
				}, {
					code: "623000",
					name: "甘南藏族自治州",
					children: [{
						code: "623001",
						name: "合作市"
					}, {
						code: "623021",
						name: "临潭县"
					}, {
						code: "623022",
						name: "卓尼县"
					}, {
						code: "623023",
						name: "舟曲县"
					}, {
						code: "623024",
						name: "迭部县"
					}, {
						code: "623025",
						name: "玛曲县"
					}, {
						code: "623026",
						name: "碌曲县"
					}, {
						code: "623027",
						name: "夏河县"
					}]
				}]
			}, {
				code: "630000",
				name: "青海省",
				children: [{
					code: "630100",
					name: "西宁市",
					children: [{
						code: "630101",
						name: "市辖区"
					}, {
						code: "630102",
						name: "城东区"
					}, {
						code: "630103",
						name: "城中区"
					}, {
						code: "630104",
						name: "城西区"
					}, {
						code: "630105",
						name: "城北区"
					}, {
						code: "630121",
						name: "大通回族土族自治县"
					}, {
						code: "630122",
						name: "湟中县"
					}, {
						code: "630123",
						name: "湟源县"
					}]
				}, {
					code: "630200",
					name: "海东市",
					children: [{
						code: "630202",
						name: "乐都区"
					}, {
						code: "630203",
						name: "平安区"
					}, {
						code: "630222",
						name: "民和回族土族自治县"
					}, {
						code: "630223",
						name: "互助土族自治县"
					}, {
						code: "630224",
						name: "化隆回族自治县"
					}, {
						code: "630225",
						name: "循化撒拉族自治县"
					}]
				}, {
					code: "632200",
					name: "海北藏族自治州",
					children: [{
						code: "632221",
						name: "门源回族自治县"
					}, {
						code: "632222",
						name: "祁连县"
					}, {
						code: "632223",
						name: "海晏县"
					}, {
						code: "632224",
						name: "刚察县"
					}]
				}, {
					code: "632300",
					name: "黄南藏族自治州",
					children: [{
						code: "632321",
						name: "同仁县"
					}, {
						code: "632322",
						name: "尖扎县"
					}, {
						code: "632323",
						name: "泽库县"
					}, {
						code: "632324",
						name: "河南蒙古族自治县"
					}]
				}, {
					code: "632500",
					name: "海南藏族自治州",
					children: [{
						code: "632521",
						name: "共和县"
					}, {
						code: "632522",
						name: "同德县"
					}, {
						code: "632523",
						name: "贵德县"
					}, {
						code: "632524",
						name: "兴海县"
					}, {
						code: "632525",
						name: "贵南县"
					}]
				}, {
					code: "632600",
					name: "果洛藏族自治州",
					children: [{
						code: "632621",
						name: "玛沁县"
					}, {
						code: "632622",
						name: "班玛县"
					}, {
						code: "632623",
						name: "甘德县"
					}, {
						code: "632624",
						name: "达日县"
					}, {
						code: "632625",
						name: "久治县"
					}, {
						code: "632626",
						name: "玛多县"
					}]
				}, {
					code: "632700",
					name: "玉树藏族自治州",
					children: [{
						code: "632701",
						name: "玉树市"
					}, {
						code: "632722",
						name: "杂多县"
					}, {
						code: "632723",
						name: "称多县"
					}, {
						code: "632724",
						name: "治多县"
					}, {
						code: "632725",
						name: "囊谦县"
					}, {
						code: "632726",
						name: "曲麻莱县"
					}]
				}, {
					code: "632800",
					name: "海西蒙古族藏族自治州",
					children: [{
						code: "632801",
						name: "格尔木市"
					}, {
						code: "632802",
						name: "德令哈市"
					}, {
						code: "632821",
						name: "乌兰县"
					}, {
						code: "632822",
						name: "都兰县"
					}, {
						code: "632823",
						name: "天峻县"
					}]
				}]
			}, {
				code: "640000",
				name: "宁夏回族自治区",
				children: [{
					code: "640100",
					name: "银川市",
					children: [{
						code: "640101",
						name: "市辖区"
					}, {
						code: "640104",
						name: "兴庆区"
					}, {
						code: "640105",
						name: "西夏区"
					}, {
						code: "640106",
						name: "金凤区"
					}, {
						code: "640121",
						name: "永宁县"
					}, {
						code: "640122",
						name: "贺兰县"
					}, {
						code: "640181",
						name: "灵武市"
					}]
				}, {
					code: "640200",
					name: "石嘴山市",
					children: [{
						code: "640201",
						name: "市辖区"
					}, {
						code: "640202",
						name: "大武口区"
					}, {
						code: "640205",
						name: "惠农区"
					}, {
						code: "640221",
						name: "平罗县"
					}]
				}, {
					code: "640300",
					name: "吴忠市",
					children: [{
						code: "640301",
						name: "市辖区"
					}, {
						code: "640302",
						name: "利通区"
					}, {
						code: "640303",
						name: "红寺堡区"
					}, {
						code: "640323",
						name: "盐池县"
					}, {
						code: "640324",
						name: "同心县"
					}, {
						code: "640381",
						name: "青铜峡市"
					}]
				}, {
					code: "640400",
					name: "固原市",
					children: [{
						code: "640401",
						name: "市辖区"
					}, {
						code: "640402",
						name: "原州区"
					}, {
						code: "640422",
						name: "西吉县"
					}, {
						code: "640423",
						name: "隆德县"
					}, {
						code: "640424",
						name: "泾源县"
					}, {
						code: "640425",
						name: "彭阳县"
					}]
				}, {
					code: "640500",
					name: "中卫市",
					children: [{
						code: "640501",
						name: "市辖区"
					}, {
						code: "640502",
						name: "沙坡头区"
					}, {
						code: "640521",
						name: "中宁县"
					}, {
						code: "640522",
						name: "海原县"
					}]
				}]
			}, {
				code: "650000",
				name: "新疆维吾尔自治区",
				children: [{
					code: "650100",
					name: "乌鲁木齐市",
					children: [{
						code: "650101",
						name: "市辖区"
					}, {
						code: "650102",
						name: "天山区"
					}, {
						code: "650103",
						name: "沙依巴克区"
					}, {
						code: "650104",
						name: "新市区"
					}, {
						code: "650105",
						name: "水磨沟区"
					}, {
						code: "650106",
						name: "头屯河区"
					}, {
						code: "650107",
						name: "达坂城区"
					}, {
						code: "650109",
						name: "米东区"
					}, {
						code: "650121",
						name: "乌鲁木齐县"
					}]
				}, {
					code: "650200",
					name: "克拉玛依市",
					children: [{
						code: "650201",
						name: "市辖区"
					}, {
						code: "650202",
						name: "独山子区"
					}, {
						code: "650203",
						name: "克拉玛依区"
					}, {
						code: "650204",
						name: "白碱滩区"
					}, {
						code: "650205",
						name: "乌尔禾区"
					}]
				}, {
					code: "650400",
					name: "吐鲁番市",
					children: [{
						code: "650402",
						name: "高昌区"
					}, {
						code: "650421",
						name: "鄯善县"
					}, {
						code: "650422",
						name: "托克逊县"
					}]
				}, {
					code: "650500",
					name: "哈密市",
					children: [{
						code: "650502",
						name: "伊州区"
					}, {
						code: "650521",
						name: "巴里坤哈萨克自治县"
					}, {
						code: "650522",
						name: "伊吾县"
					}]
				}, {
					code: "652300",
					name: "昌吉回族自治州",
					children: [{
						code: "652301",
						name: "昌吉市"
					}, {
						code: "652302",
						name: "阜康市"
					}, {
						code: "652323",
						name: "呼图壁县"
					}, {
						code: "652324",
						name: "玛纳斯县"
					}, {
						code: "652325",
						name: "奇台县"
					}, {
						code: "652327",
						name: "吉木萨尔县"
					}, {
						code: "652328",
						name: "木垒哈萨克自治县"
					}]
				}, {
					code: "652700",
					name: "博尔塔拉蒙古自治州",
					children: [{
						code: "652701",
						name: "博乐市"
					}, {
						code: "652702",
						name: "阿拉山口市"
					}, {
						code: "652722",
						name: "精河县"
					}, {
						code: "652723",
						name: "温泉县"
					}]
				}, {
					code: "652800",
					name: "巴音郭楞蒙古自治州",
					children: [{
						code: "652801",
						name: "库尔勒市"
					}, {
						code: "652822",
						name: "轮台县"
					}, {
						code: "652823",
						name: "尉犁县"
					}, {
						code: "652824",
						name: "若羌县"
					}, {
						code: "652825",
						name: "且末县"
					}, {
						code: "652826",
						name: "焉耆回族自治县"
					}, {
						code: "652827",
						name: "和静县"
					}, {
						code: "652828",
						name: "和硕县"
					}, {
						code: "652829",
						name: "博湖县"
					}]
				}, {
					code: "652900",
					name: "阿克苏地区",
					children: [{
						code: "652901",
						name: "阿克苏市"
					}, {
						code: "652922",
						name: "温宿县"
					}, {
						code: "652923",
						name: "库车县"
					}, {
						code: "652924",
						name: "沙雅县"
					}, {
						code: "652925",
						name: "新和县"
					}, {
						code: "652926",
						name: "拜城县"
					}, {
						code: "652927",
						name: "乌什县"
					}, {
						code: "652928",
						name: "阿瓦提县"
					}, {
						code: "652929",
						name: "柯坪县"
					}]
				}, {
					code: "653000",
					name: "克孜勒苏柯尔克孜自治州",
					children: [{
						code: "653001",
						name: "阿图什市"
					}, {
						code: "653022",
						name: "阿克陶县"
					}, {
						code: "653023",
						name: "阿合奇县"
					}, {
						code: "653024",
						name: "乌恰县"
					}]
				}, {
					code: "653100",
					name: "喀什地区",
					children: [{
						code: "653101",
						name: "喀什市"
					}, {
						code: "653121",
						name: "疏附县"
					}, {
						code: "653122",
						name: "疏勒县"
					}, {
						code: "653123",
						name: "英吉沙县"
					}, {
						code: "653124",
						name: "泽普县"
					}, {
						code: "653125",
						name: "莎车县"
					}, {
						code: "653126",
						name: "叶城县"
					}, {
						code: "653127",
						name: "麦盖提县"
					}, {
						code: "653128",
						name: "岳普湖县"
					}, {
						code: "653129",
						name: "伽师县"
					}, {
						code: "653130",
						name: "巴楚县"
					}, {
						code: "653131",
						name: "塔什库尔干塔吉克自治县"
					}]
				}, {
					code: "653200",
					name: "和田地区",
					children: [{
						code: "653201",
						name: "和田市"
					}, {
						code: "653221",
						name: "和田县"
					}, {
						code: "653222",
						name: "墨玉县"
					}, {
						code: "653223",
						name: "皮山县"
					}, {
						code: "653224",
						name: "洛浦县"
					}, {
						code: "653225",
						name: "策勒县"
					}, {
						code: "653226",
						name: "于田县"
					}, {
						code: "653227",
						name: "民丰县"
					}]
				}, {
					code: "654000",
					name: "伊犁哈萨克自治州",
					children: [{
						code: "654002",
						name: "伊宁市"
					}, {
						code: "654003",
						name: "奎屯市"
					}, {
						code: "654004",
						name: "霍尔果斯市"
					}, {
						code: "654021",
						name: "伊宁县"
					}, {
						code: "654022",
						name: "察布查尔锡伯自治县"
					}, {
						code: "654023",
						name: "霍城县"
					}, {
						code: "654024",
						name: "巩留县"
					}, {
						code: "654025",
						name: "新源县"
					}, {
						code: "654026",
						name: "昭苏县"
					}, {
						code: "654027",
						name: "特克斯县"
					}, {
						code: "654028",
						name: "尼勒克县"
					}]
				}, {
					code: "654200",
					name: "塔城地区",
					children: [{
						code: "654201",
						name: "塔城市"
					}, {
						code: "654202",
						name: "乌苏市"
					}, {
						code: "654221",
						name: "额敏县"
					}, {
						code: "654223",
						name: "沙湾县"
					}, {
						code: "654224",
						name: "托里县"
					}, {
						code: "654225",
						name: "裕民县"
					}, {
						code: "654226",
						name: "和布克赛尔蒙古自治县"
					}]
				}, {
					code: "654300",
					name: "阿勒泰地区",
					children: [{
						code: "654301",
						name: "阿勒泰市"
					}, {
						code: "654321",
						name: "布尔津县"
					}, {
						code: "654322",
						name: "富蕴县"
					}, {
						code: "654323",
						name: "福海县"
					}, {
						code: "654324",
						name: "哈巴河县"
					}, {
						code: "654325",
						name: "青河县"
					}, {
						code: "654326",
						name: "吉木乃县"
					}]
				}, {
					code: "659000",
					name: "自治区直辖县级行政区划",
					children: [{
						code: "659001",
						name: "石河子市"
					}, {
						code: "659002",
						name: "阿拉尔市"
					}, {
						code: "659003",
						name: "图木舒克市"
					}, {
						code: "659004",
						name: "五家渠市"
					}, {
						code: "659006",
						name: "铁门关市"
					}]
				}]
			},
			{
				code: "710000",
				name: "台湾省",
				children: [

				]
			}, {
				code: "810000",
				name: "香港特别行政区",
				children: [{
						code: "810101",
						name: "中西区"
					},
					{
						code: "810102",
						name: "湾仔区"
					},
					{
						code: "810103",
						name: "东区"
					},
					{
						code: "810104",
						name: "南区"
					},
					{
						code: "810105",
						name: "油尖旺区"
					},
					{
						code: "810106",
						name: "深水埗区"
					},
					{
						code: "810107",
						name: "九龙城区"
					},
					{
						code: "810108",
						name: "黄大仙区"
					},
					{
						code: "810109",
						name: "观塘区"
					},
					{
						code: "810110",
						name: "北区"
					},
					{
						code: "810111",
						name: "大埔区"
					},
					{
						code: "810112",
						name: "沙田区"
					},
					{
						code: "810113",
						name: "西贡区"
					},
					{
						code: "810114",
						name: "荃湾区"
					},
					{
						code: "810115",
						name: "屯门区"
					},
					{
						code: "810116",
						name: "元朗区"
					},
					{
						code: "810117",
						name: "葵青区"
					},
					{
						code: "810118",
						name: "离岛区"
					}
				]
			}, {
				code: "820000",
				name: "澳门特别行政区",
				children: [{
						code: "820101",
						name: "花地玛堂区"
					},
					{
						code: "820102",
						name: "圣安多尼堂区"
					},
					{
						code: "820103",
						name: "大堂区"
					},
					{
						code: "820104",
						name: "望德堂区"
					},
					{
						code: "820105",
						name: "风顺堂区"
					},
					{
						code: "820106",
						name: "嘉模堂区"
					},
					{
						code: "820107",
						name: "圣方济各堂区"
					},
					{
						code: "820108",
						name: "路氹城"
					},
					{
						code: "820109",
						name: "澳门新城"
					}
				]
			}
		],
		cityListCurrent:null,
		jobDetails:[],
		moreJob: [],
		interested:[],
		cityCurrent: null,
		jobName: '',
		// 行业
		jobList: [{
				name: '全部',
				list: []
			},
			{
				name: 'CXO',
				list: [{
						name: 'CEO'
					},
					{
						name: 'COO'
					},
					{
						name: 'CFO'
					},
					{
						name: 'CTO'
					},
					{
						name: 'CIO'
					},
					{
						name: 'CHO'
					},
					{
						name: '总裁'
					},
					{
						name: '副总裁'
					},
					{
						name: '总经理'
					},
				]
			},
			{
				name: '地产',
				list: []
			},
			{
				name: '互联网',
				list: []
			},
			{
				name: '汽车',
				list: []
			},
			{
				name: '金融',
				list: []
			},
			{
				name: '文旅',
				list: []
			},
			{
				name: '酒店',
				list: []
			},
			{
				name: '教育',
				list: []
			},
			{
				name: '商业',
				list: []
			},
			{
				name: '物业',
				list: []
			},
			{
				name: '其他',
				list: []
			},
		],
		jobCurrent: null,
		jobListCurrent: null,

		// 市区
		provinceList: ['全北京', '东城区', '西城区', '朝阳区', '丰田区'],
		provinceCurrent: null,
		// 年薪
		rouesubways: [],
		rouesubway: [{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "西苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "农大南路"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "马连洼"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "西北旺"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "永丰南"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "永丰"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "屯佃"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "稻香湖路"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "温阳路"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(西苑-北安河)",
				stepName: "北安河"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(石厂-金安桥)",
				stepName: "石厂"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(石厂-金安桥)",
				stepName: "小园"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(石厂-金安桥)",
				stepName: "栗园庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(石厂-金安桥)",
				stepName: "上岸"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(石厂-金安桥)",
				stepName: "桥户营"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(石厂-金安桥)",
				stepName: "四道桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(石厂-金安桥)",
				stepName: "金安桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "阎村东"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "紫草坞"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "阎村"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "星城"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "大石河东"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "马各庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "饶乐府"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "房山城关"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(阎村东-燕山)",
				stepName: "燕山"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(香山-巴沟)",
				stepName: "香山"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(香山-巴沟)",
				stepName: "植物园"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(香山-巴沟)",
				stepName: "万安"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(香山-巴沟)",
				stepName: "茶棚"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(香山-巴沟)",
				stepName: "颐和园西门"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(香山-巴沟)",
				stepName: "巴沟"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(金安桥-石厂)",
				stepName: "金安桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(金安桥-石厂)",
				stepName: "四道桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(金安桥-石厂)",
				stepName: "桥户营"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(金安桥-石厂)",
				stepName: "上岸"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(金安桥-石厂)",
				stepName: "栗园庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(金安桥-石厂)",
				stepName: "小园"
			},
			{
				cityName: "北京市",
				lineName: "地铁s1线(金安桥-石厂)",
				stepName: "石厂"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "清华东路西口"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "六道口"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "北沙滩"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "奥林匹克公园"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "安立路"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "大屯路东"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "关庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "望京西"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "望京"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "望京东"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "崔各庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "马泉营"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "孙河"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "国展"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "花梨坎"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "后沙峪"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "南法信"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "石门"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "顺义"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(清华东路西口-俸伯)",
				stepName: "俸伯"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "南锣鼓巷"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "什刹海"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "鼓楼大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "安德里北街"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "安华桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "北土城"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "奥体中心"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "奥林匹克公园"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "森林公园南门"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "林萃桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "永泰庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "西小口"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "育新"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "霍营"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "回龙观东大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "平西府"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "育知路"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(南锣鼓巷-朱辛庄)",
				stepName: "朱辛庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "俸伯"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "顺义"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "石门"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "南法信"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "后沙峪"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "花梨坎"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "国展"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "孙河"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "马泉营"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "崔各庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "望京东"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "望京"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "望京西"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "关庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "大屯路东"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "安立路"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "奥林匹克公园"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "北沙滩"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "六道口"
			},
			{
				cityName: "北京市",
				lineName: "地铁15号线(俸伯-清华东路西口)",
				stepName: "清华东路西口"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "北京南站"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "永定门外"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "景泰"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "蒲黄榆"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "方庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "十里河"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "北工大西门"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "平乐园"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "九龙山"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "大望路"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "金台路"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "朝阳公园"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "枣营"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "东风北桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "将台"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "望京南"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "阜通"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "望京"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "东湖渠"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "来广营"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(北京南站-善各庄)",
				stepName: "善各庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(西局-张郭庄)",
				stepName: "西局"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(西局-张郭庄)",
				stepName: "七里庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(西局-张郭庄)",
				stepName: "大井"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(西局-张郭庄)",
				stepName: "郭庄子"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(西局-张郭庄)",
				stepName: "大瓦窑"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(西局-张郭庄)",
				stepName: "园博园"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(西局-张郭庄)",
				stepName: "张郭庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "昌平西山口"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "十三陵景区"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "昌平"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "昌平东关"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "北邵洼"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "南邵"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "沙河高教园"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "沙河"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "巩华城"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "朱辛庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "生命科学园"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(昌平西山口-西二旗)",
				stepName: "西二旗"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "善各庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "来广营"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "东湖渠"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "望京"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "阜通"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "望京南"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "将台"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "东风北桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "枣营"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "朝阳公园"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "金台路"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "大望路"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "九龙山"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "平乐园"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "北工大西门"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "十里河"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "方庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "蒲黄榆"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "景泰"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "永定门外"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线东段(善各庄-北京南站)",
				stepName: "北京南站"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "西二旗"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "生命科学园"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "朱辛庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "巩华城"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "沙河"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "沙河高教园"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "南邵"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "北邵洼"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "昌平东关"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "昌平"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "十三陵景区"
			},
			{
				cityName: "北京市",
				lineName: "地铁昌平线(西二旗-昌平西山口)",
				stepName: "昌平西山口"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "郭公庄"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "大葆台"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "稻田"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "长阳"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "篱笆房"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "广阳城"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "良乡大学城北"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "良乡大学城"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "良乡大学城西"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "良乡南关"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "苏庄"
			},
			{
				cityName: "北京市",
				lineName: "房山线(郭公庄-阎村东)",
				stepName: "阎村东"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "安河桥北"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "北宫门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "西苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "圆明园"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "北京大学东门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "中关村"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "海淀黄庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "人民大学"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "魏公村"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "国家图书馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "动物园"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "西直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "新街口"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "平安里"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "西四"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "灵境胡同"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "西单"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "宣武门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "菜市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "陶然亭"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "北京南站"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "马家堡"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "角门西"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "公益西桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "新宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "西红门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "高米店北"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "高米店南"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "枣园"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "清源路"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "黄村西大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "黄村火车站"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "义和庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "生物医药基地"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(安河桥北-天宫院)",
				stepName: "天宫院"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "焦化厂"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "双合"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "欢乐谷景区"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "南楼梓庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "化工"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "百子湾"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "大郊亭"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "九龙山"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "广渠门外"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "广渠门内"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "磁器口"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "桥湾"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "珠市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "虎坊桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "菜市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "广安门内"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "达官营"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "湾子"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(焦化厂-北京西站)",
				stepName: "北京西站"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "次渠"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "次渠南"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "经海路"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "同济南路"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "荣昌东街"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "荣京东街"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "万源街"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "亦庄文化园"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "亦庄桥"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "旧宫"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "小红门"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "肖村"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(次渠-宋家庄)",
				stepName: "宋家庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "国家图书馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "白石桥南"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "白堆子"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "军事博物馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "北京西站"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "六里桥东"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "六里桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "七里庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "丰台东大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "丰台南路"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "科怡路"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "丰台科技园"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(国家图书馆-郭公庄)",
				stepName: "郭公庄"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "宋家庄"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "肖村"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "小红门"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "旧宫"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "亦庄桥"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "亦庄文化园"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "万源街"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "荣京东街"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "荣昌东街"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "同济南路"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "经海路"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "次渠南"
			},
			{
				cityName: "北京市",
				lineName: "亦庄线(宋家庄-次渠)",
				stepName: "次渠"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(张郭庄-西局)",
				stepName: "张郭庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(张郭庄-西局)",
				stepName: "园博园"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(张郭庄-西局)",
				stepName: "大瓦窑"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(张郭庄-西局)",
				stepName: "郭庄子"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(张郭庄-西局)",
				stepName: "大井"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(张郭庄-西局)",
				stepName: "七里庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁14号线西段(张郭庄-西局)",
				stepName: "西局"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "海淀五路居"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "慈寿寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "花园桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "白石桥南"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "车公庄西"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "车公庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "平安里"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "北海北"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "南锣鼓巷"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "东四"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "朝阳门"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "东大桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "呼家楼"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "金台路"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "十里堡"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "青年路"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "褡裢坡"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "黄渠"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "常营"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "草房"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "物资学院路"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "通州北关"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "北运河西"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "郝家府"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "东夏园"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(海淀五路居-潞城)",
				stepName: "潞城"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "郭公庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "丰台科技园"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "科怡路"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "丰台南路"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "丰台东大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "七里庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "六里桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "六里桥东"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "北京西站"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "军事博物馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "白堆子"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "白石桥南"
			},
			{
				cityName: "北京市",
				lineName: "地铁9号线(郭公庄-国家图书馆)",
				stepName: "国家图书馆"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "阎村东"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "苏庄"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "良乡南关"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "良乡大学城西"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "良乡大学城"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "良乡大学城北"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "广阳城"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "篱笆房"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "长阳"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "稻田"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "大葆台"
			},
			{
				cityName: "北京市",
				lineName: "房山线(阎村东-郭公庄)",
				stepName: "郭公庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "潞城"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "东夏园"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "郝家府"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "北运河西"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "通州北关"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "物资学院路"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "草房"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "常营"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "黄渠"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "褡裢坡"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "青年路"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "十里堡"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "金台路"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "呼家楼"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "东大桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "朝阳门"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "东四"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "南锣鼓巷"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "北海北"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "平安里"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "车公庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "车公庄西"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "白石桥南"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "花园桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "慈寿寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁6号线(潞城-海淀五路居)",
				stepName: "海淀五路居"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "天宫院"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "生物医药基地"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "义和庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "黄村火车站"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "黄村西大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "清源路"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "枣园"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "高米店南"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "高米店北"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "西红门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "新宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "公益西桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "角门西"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "马家堡"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "北京南站"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "陶然亭"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "菜市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "宣武门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "西单"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "灵境胡同"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "西四"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "平安里"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "新街口"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "西直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "动物园"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "国家图书馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "魏公村"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "人民大学"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "海淀黄庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "中关村"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "北京大学东门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "圆明园"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "西苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "北宫门"
			},
			{
				cityName: "北京市",
				lineName: "地铁4号线大兴线(天宫院-安河桥北)",
				stepName: "安河桥北"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "北京西站"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "湾子"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "达官营"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "广安门内"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "菜市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "虎坊桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "珠市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "桥湾"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "磁器口"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "广渠门内"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "广渠门外"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "九龙山"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "大郊亭"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "百子湾"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "化工"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "南楼梓庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "欢乐谷景区"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "双合"
			},
			{
				cityName: "北京市",
				lineName: "地铁7号线(北京西站-焦化厂)",
				stepName: "焦化厂"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "朱辛庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "育知路"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "平西府"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "回龙观东大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "霍营"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "育新"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "西小口"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "永泰庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "林萃桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "森林公园南门"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "奥林匹克公园"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "奥体中心"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "北土城"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "安华桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "安德里北街"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "鼓楼大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "什刹海"
			},
			{
				cityName: "北京市",
				lineName: "地铁8号线(朱辛庄-南锣鼓巷)",
				stepName: "南锣鼓巷"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(巴沟-香山)",
				stepName: "巴沟"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(巴沟-香山)",
				stepName: "颐和园西门"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(巴沟-香山)",
				stepName: "茶棚"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(巴沟-香山)",
				stepName: "万安"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(巴沟-香山)",
				stepName: "植物园"
			},
			{
				cityName: "北京市",
				lineName: "西郊线(巴沟-香山)",
				stepName: "香山"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "燕山"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "房山城关"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "饶乐府"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "马各庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "大石河东"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "星城"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "阎村"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "紫草坞"
			},
			{
				cityName: "北京市",
				lineName: "地铁燕房线(燕山-阎村东)",
				stepName: "阎村东"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "北安河"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "温阳路"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "稻香湖路"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "屯佃"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "永丰"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "永丰南"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "西北旺"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "马连洼"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "农大南路"
			},
			{
				cityName: "北京市",
				lineName: "地铁16号线(北安河-西苑)",
				stepName: "西苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "积水潭"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "鼓楼大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "安定门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "雍和宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "东直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "东四十条"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "朝阳门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "建国门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "北京站"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "崇文门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "前门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "和平门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "宣武门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "长椿街"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "复兴门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "阜成门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "车公庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "西直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "积水潭"
			},
			{
				cityName: "北京市",
				lineName: "机场线(东直门-东直门)",
				stepName: "东直门"
			},
			{
				cityName: "北京市",
				lineName: "机场线(东直门-东直门)",
				stepName: "三元桥"
			},
			{
				cityName: "北京市",
				lineName: "机场线(东直门-东直门)",
				stepName: "T3航站楼"
			},
			{
				cityName: "北京市",
				lineName: "机场线(东直门-东直门)",
				stepName: "T2航站楼"
			},
			{
				cityName: "北京市",
				lineName: "机场线(东直门-东直门)",
				stepName: "三元桥"
			},
			{
				cityName: "北京市",
				lineName: "机场线(东直门-东直门)",
				stepName: "东直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "苹果园"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "古城"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "八角游乐园"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "八宝山"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "玉泉路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "五棵松"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "万寿路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "公主坟"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "军事博物馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "木樨地"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "南礼士路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "复兴门"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "西单"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "天安门西"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "天安门东"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "王府井"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "东单"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "建国门"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "永安里"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "国贸"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "大望路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "四惠"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(苹果园-四惠东)",
				stepName: "四惠东"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "宋家庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "刘家窑"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "蒲黄榆"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "天坛东门"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "磁器口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "崇文门"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "东单"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "灯市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "东四"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "张自忠路"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "北新桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "雍和宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "和平里北街"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "和平西桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "惠新西街南口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "惠新西街北口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "大屯路东"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "北苑路北"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "立水桥南"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "立水桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "天通苑南"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "天通苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(宋家庄-天通苑北)",
				stepName: "天通苑北"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "四惠东"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "四惠"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "大望路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "国贸"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "永安里"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "建国门"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "东单"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "王府井"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "天安门东"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "天安门西"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "西单"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "复兴门"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "南礼士路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "木樨地"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "军事博物馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "公主坟"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "万寿路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "五棵松"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "玉泉路"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "八宝山"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "八角游乐园"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "古城"
			},
			{
				cityName: "北京市",
				lineName: "地铁1号线(四惠东-苹果园)",
				stepName: "苹果园"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "土桥"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "临河里"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "梨园"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "九棵树"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "果园"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "通州北苑"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "八里桥"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "管庄"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "双桥"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "传媒大学"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "高碑店"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "四惠东"
			},
			{
				cityName: "北京市",
				lineName: "八通线(土桥-四惠)",
				stepName: "四惠"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "巴沟"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "火器营"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "长春桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "车道沟"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "慈寿寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "西钓鱼台"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "公主坟"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "莲花桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "六里桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "西局"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "泥洼"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "丰台站"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "首经贸"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "纪家庙"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "草桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "角门西"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "角门东"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "大红门"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "石榴庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "宋家庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "成寿寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "分钟寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "十里河"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "潘家园"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "劲松"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "双井"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "国贸"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "金台夕照"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "呼家楼"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "团结湖"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "农业展览馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "亮马桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "三元桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "太阳宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "芍药居"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "惠新西街南口"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "安贞门"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "北土城"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "健德门"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "牡丹园"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "西土城"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "知春路"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "知春里"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "海淀黄庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "苏州街"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "巴沟"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "西直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "车公庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "阜成门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "复兴门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "长椿街"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "宣武门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "和平门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "前门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "崇文门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "北京站"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "建国门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "朝阳门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "东四十条"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "东直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "雍和宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "安定门"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "鼓楼大街"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "积水潭"
			},
			{
				cityName: "北京市",
				lineName: "地铁2号线",
				stepName: "西直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "天通苑北"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "天通苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "天通苑南"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "立水桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "立水桥南"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "北苑路北"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "大屯路东"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "惠新西街北口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "惠新西街南口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "和平西桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "和平里北街"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "雍和宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "北新桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "张自忠路"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "东四"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "灯市口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "东单"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "崇文门"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "磁器口"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "天坛东门"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "蒲黄榆"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "刘家窑"
			},
			{
				cityName: "北京市",
				lineName: "地铁5号线(天通苑北-宋家庄)",
				stepName: "宋家庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "东直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "柳芳"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "光熙门"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "芍药居"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "望京西"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "北苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "立水桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "霍营"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "回龙观"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "龙泽"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "西二旗"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "上地"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "五道口"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "知春路"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "大钟寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(东直门-西直门)",
				stepName: "西直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "车道沟"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "长春桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "火器营"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "巴沟"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "苏州街"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "海淀黄庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "知春里"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "知春路"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "西土城"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "牡丹园"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "健德门"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "北土城"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "安贞门"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "惠新西街南口"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "芍药居"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "太阳宫"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "三元桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "亮马桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "农业展览馆"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "团结湖"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "呼家楼"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "金台夕照"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "国贸"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "双井"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "劲松"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "潘家园"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "十里河"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "分钟寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "成寿寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "宋家庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "石榴庄"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "大红门"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "角门东"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "角门西"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "草桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "纪家庙"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "首经贸"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "丰台站"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "泥洼"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "西局"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "六里桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "莲花桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "公主坟"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "西钓鱼台"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "慈寿寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁10号线",
				stepName: "车道沟"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "四惠"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "四惠东"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "高碑店"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "传媒大学"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "双桥"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "管庄"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "八里桥"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "通州北苑"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "果园"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "九棵树"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "梨园"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "临河里"
			},
			{
				cityName: "北京市",
				lineName: "八通线(四惠-土桥)",
				stepName: "土桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "西直门"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "大钟寺"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "知春路"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "五道口"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "上地"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "西二旗"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "龙泽"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "回龙观"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "霍营"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "立水桥"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "北苑"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "望京西"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "芍药居"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "光熙门"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "柳芳"
			},
			{
				cityName: "北京市",
				lineName: "地铁13号线(西直门-东直门)",
				stepName: "东直门"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(沈杜公路-汇臻路)",
				stepName: "沈杜公路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(沈杜公路-汇臻路)",
				stepName: "三鲁公路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(沈杜公路-汇臻路)",
				stepName: "闵瑞路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(沈杜公路-汇臻路)",
				stepName: "浦航路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(沈杜公路-汇臻路)",
				stepName: "东城一路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(沈杜公路-汇臻路)",
				stepName: "汇臻路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "市光路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "嫩江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "翔殷路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "黄兴公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "延吉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "黄兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "江浦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "鞍山新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "四平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "曲阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "虹口足球场"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "西藏北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "中兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "曲阜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "人民广场"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "大世界"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "老西门"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "陆家浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "西藏南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "中华艺术宫"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "耀华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "成山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "杨思"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "凌兆新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "芦恒路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "浦江镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "江月路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "联航路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(市光路-沈杜公路)",
				stepName: "沈杜公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "金运路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "金沙江西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "丰庄"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "祁连山南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "真北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "大渡河路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "金沙江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "隆德路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "武宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "长寿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "江宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "汉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "自然博物馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "南京西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "淮海中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "新天地"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "马当路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "世博会博物馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(金运路-世博大道)",
				stepName: "世博大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "曹路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "民雷路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "顾唐路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "金海路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "金吉路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "金桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "台儿庄路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "蓝天路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "芳甸路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "杨高中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "商城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "小南门"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "陆家浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "马当路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "打浦桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "嘉善路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "肇嘉浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "桂林路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "漕河泾开发区"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "合川路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "星中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "七宝"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "中春路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "九亭"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "泗泾"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "佘山"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "洞泾"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "松江大学城"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "松江新城"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "松江体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "醉白池"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(曹路-松江南站)",
				stepName: "松江南站"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "莘庄"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "外环路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "莲花路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "锦江乐园"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "上海南站"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "漕宝路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "上海体育馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "衡山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "常熟路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "黄陂南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "人民广场"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "新闸路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "汉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "上海火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "中山北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "延长路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "上海马戏城"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "汶水路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "彭浦新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "共康路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "通河新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "呼兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "共富新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "宝安公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "友谊西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(莘庄-富锦路)",
				stepName: "富锦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "徐泾东"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "虹桥火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "虹桥2号航站楼"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "淞虹路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "北新泾"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "威宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "娄山关路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "中山公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "江苏路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "静安寺"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "南京西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "人民广场"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "南京东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "陆家嘴"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "东昌路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "上海科技馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "世纪公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "张江高科"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "金科路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(徐泾东-广兰路)",
				stepName: "广兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "花木路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "芳华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "锦绣路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "杨高南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "高科西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "云台路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "耀华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "长清路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "后滩"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "龙华中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "东安路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "肇嘉浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "常熟路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "静安寺"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "昌平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "长寿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "镇坪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "岚皋路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "新村路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "大华三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "行知路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "大场镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "场中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "上大路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "南陈路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "上海大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "祁华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "顾村公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "刘行"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "潘广路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "罗南新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(花木路-美兰湖)",
				stepName: "美兰湖"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "江杨北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "铁力路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "友谊路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "宝杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "水产路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "淞滨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "张华浜"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "淞发路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "长江南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "殷高西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "江湾镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "大柏树"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "赤峰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "虹口足球场"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "东宝兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "宝山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "上海火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "中潭路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "镇坪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "金沙江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "中山公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "延安西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "漕溪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "龙漕路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "石龙路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(江杨北路-上海南站)",
				stepName: "上海南站"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "沈杜公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "联航路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "江月路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "浦江镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "芦恒路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "凌兆新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "杨思"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "成山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "耀华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "中华艺术宫"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "西藏南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "陆家浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "老西门"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "大世界"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "人民广场"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "曲阜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "中兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "西藏北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "虹口足球场"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "曲阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "四平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "鞍山新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "江浦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "黄兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "延吉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "黄兴公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "翔殷路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "嫩江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁8号线(沈杜公路-市光路)",
				stepName: "市光路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "港城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "外高桥保税区北"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "航津路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "外高桥保税区南"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "洲海路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "五洲大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "东靖路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "巨峰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "五莲路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "博兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "金桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "云山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "德平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "北洋泾路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "民生路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "源深体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "浦电路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "蓝村路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "上海儿童医学中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "临沂新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "高科西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "东明路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "高青路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "华夏西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "上南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "灵岩南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(港城路-东方体育中心)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "松江南站"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "醉白池"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "松江体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "松江新城"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "松江大学城"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "洞泾"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "佘山"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "泗泾"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "九亭"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "中春路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "七宝"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "星中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "合川路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "漕河泾开发区"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "桂林路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "肇嘉浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "嘉善路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "打浦桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "马当路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "陆家浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "小南门"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "商城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "杨高中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "芳甸路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "蓝天路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "台儿庄路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "金桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "金吉路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "金海路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "顾唐路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "民雷路"
			},
			{
				cityName: "上海市",
				lineName: "地铁9号线(松江南站-曹路)",
				stepName: "曹路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "灵岩南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "上南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "华夏西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "高青路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "东明路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "高科西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "临沂新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "上海儿童医学中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "蓝村路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "浦电路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "源深体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "民生路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "北洋泾路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "德平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "云山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "金桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "博兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "五莲路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "巨峰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "东靖路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "五洲大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "洲海路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "外高桥保税区南"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "航津路"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "外高桥保税区北"
			},
			{
				cityName: "上海市",
				lineName: "地铁6号线(东方体育中心-港城路)",
				stepName: "港城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "虹桥火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "虹桥2号航站楼"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "虹桥1号航站楼"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "上海动物园"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "龙溪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "水城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "伊犁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "宋园路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "上海图书馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "新天地"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "老西门"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "豫园"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "南京东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "天潼路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "四川北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "海伦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "邮电新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "四平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "同济大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "国权路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "五角场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "江湾体育场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "三门路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "殷高东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(虹桥火车站-新江湾城)",
				stepName: "新江湾城"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "广兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "唐镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "创新中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "华夏东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "川沙"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "凌空路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "远东大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "海天三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(广兰路-浦东国际机场)",
				stepName: "浦东国际机场"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "七莘路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "虹莘路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "顾戴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "东兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "虹梅路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "虹漕路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "桂林公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "漕宝路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "龙漕路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "龙华"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "龙华中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "大木桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "嘉善路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "南京西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "汉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "曲阜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "天潼路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "国际客运中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "提篮桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "大连路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "江浦公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "宁国路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "隆昌路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "爱国路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "复兴岛"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "东陆路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "巨峰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "杨高北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "金京路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "申江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(七莘路-金海路)",
				stepName: "金海路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "美兰湖"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "罗南新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "潘广路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "刘行"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "顾村公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "祁华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "上海大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "南陈路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "上大路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "场中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "大场镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "行知路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "大华三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "新村路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "岚皋路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "镇坪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "长寿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "昌平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "静安寺"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "常熟路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "肇嘉浜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "东安路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "龙华中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "后滩"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "长清路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "耀华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "云台路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "高科西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "杨高南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "锦绣路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "芳华路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁7号线(美兰湖-花木路)",
				stepName: "花木路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "新江湾城"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "殷高东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "三门路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "江湾体育场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "五角场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "国权路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "同济大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "四平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "邮电新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "海伦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "四川北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "天潼路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "南京东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "豫园"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "老西门"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "新天地"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "上海图书馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "宋园路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "伊犁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "水城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "龙溪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "上海动物园"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "虹桥1号航站楼"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "虹桥2号航站楼"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-虹桥火车站)",
				stepName: "虹桥火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "闵行开发区"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "文井路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "华宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "金平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "东川路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "剑川路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "北桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "颛桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "银都路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "春申路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(闵行开发区-莘庄)",
				stepName: "莘庄"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "华夏中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "罗山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "周浦东"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "鹤沙航城"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "航头东"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "新场"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "野生动物园"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "惠南"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "惠南东"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "书院"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "临港大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(龙阳路-滴水湖)",
				stepName: "滴水湖"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "滴水湖"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "临港大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "书院"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "惠南东"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "惠南"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "野生动物园"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "新场"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "航头东"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "鹤沙航城"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "周浦东"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "罗山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "华夏中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁16号线(滴水湖-龙阳路)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "延安西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "中山公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "金沙江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "镇坪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "中潭路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "上海火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "宝山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "海伦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "临平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "大连路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "杨树浦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "浦东大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "浦电路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "蓝村路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "塘桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "南浦大桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "西藏南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "鲁班路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "大木桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "东安路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "上海体育场"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "上海体育馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(内圈(宜山路-宜山路))",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "嘉定北"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "嘉定西"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "白银路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "嘉定新城"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "马陆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "南翔"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "桃浦新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "武威路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "祁连山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "李子园"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "上海西站"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "真如"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "枫桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "隆德路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "江苏路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "上海游泳馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "龙华"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "云锦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "龙耀路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "三林"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "三林东"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "浦三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "御桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "罗山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "秀沿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "康新公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(嘉定北-迪士尼)",
				stepName: "迪士尼"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "航中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "紫藤路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "龙柏新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "龙溪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "水城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "伊犁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "宋园路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "上海图书馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "新天地"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "老西门"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "豫园"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "南京东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "天潼路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "四川北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "海伦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "邮电新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "四平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "同济大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "国权路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "五角场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "江湾体育场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "三门路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "殷高东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(航中路-新江湾城)",
				stepName: "新江湾城"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "金海路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "申江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "金京路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "杨高北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "巨峰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "东陆路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "复兴岛"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "爱国路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "隆昌路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "宁国路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "江浦公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "大连路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "提篮桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "国际客运中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "天潼路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "曲阜路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "汉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "南京西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "嘉善路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "大木桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "龙华中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "龙华"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "龙漕路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "漕宝路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "桂林公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "虹漕路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "虹梅路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "东兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "顾戴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "虹莘路"
			},
			{
				cityName: "上海市",
				lineName: "地铁12号线(金海路-七莘路)",
				stepName: "七莘路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "迪士尼"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "康新公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "秀沿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "罗山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "御桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "浦三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "三林东"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "三林"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "龙耀路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "云锦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "龙华"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "上海游泳馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "江苏路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "隆德路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "枫桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "真如"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "上海西站"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "李子园"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "祁连山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "武威路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "桃浦新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "南翔"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "马陆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "嘉定新城"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "白银路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "嘉定西"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-嘉定北)",
				stepName: "嘉定北"
			},
			{
				cityName: "上海市",
				lineName: "磁悬浮(龙阳路-浦东国际机场)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "磁悬浮(龙阳路-浦东国际机场)",
				stepName: "浦东国际机场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "新江湾城"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "殷高东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "三门路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "江湾体育场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "五角场"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "国权路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "同济大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "四平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "邮电新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "海伦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "四川北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "天潼路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "南京东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "豫园"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "老西门"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "新天地"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "上海图书馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "宋园路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "伊犁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "水城路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "龙溪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "龙柏新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "紫藤路"
			},
			{
				cityName: "上海市",
				lineName: "地铁10号线(新江湾城-航中路)",
				stepName: "航中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "迪士尼"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "康新公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "秀沿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "罗山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "御桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "浦三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "三林东"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "三林"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "龙耀路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "云锦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "龙华"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海游泳馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "江苏路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "隆德路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "枫桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "真如"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海西站"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "李子园"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "祁连山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "武威路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "桃浦新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "南翔"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "马陆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "嘉定新城"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海赛车场"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "昌吉东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海汽车城"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "安亭"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "兆丰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "光明路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "花桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "上海体育馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "上海体育场"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "东安路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "大木桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "鲁班路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "西藏南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "南浦大桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "塘桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "蓝村路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "浦电路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "浦东大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "杨树浦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "大连路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "临平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "海伦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "宝山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "上海火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "中潭路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "镇坪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "金沙江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "中山公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "延安西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁4号线(外圈(宜山路-宜山路))",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "花桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "光明路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "兆丰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "安亭"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海汽车城"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "昌吉东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海赛车场"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "嘉定新城"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "马陆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "南翔"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "桃浦新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "武威路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "祁连山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "李子园"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海西站"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "真如"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "枫桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "隆德路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "江苏路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "交通大学"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海游泳馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "龙华"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "云锦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "龙耀路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "东方体育中心"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "三林"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "三林东"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "浦三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "御桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "罗山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "秀沿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "康新公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "迪士尼"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "广兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "金科路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "张江高科"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "世纪公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "上海科技馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "世纪大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "东昌路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "陆家嘴"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "南京东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "人民广场"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "南京西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "静安寺"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "江苏路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "中山公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "娄山关路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "威宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "北新泾"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "淞虹路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "虹桥2号航站楼"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "虹桥火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线(广兰路-徐泾东)",
				stepName: "徐泾东"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "莘庄"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "春申路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "银都路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "颛桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "北桥"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "剑川路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "东川路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "金平路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "华宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "文井路"
			},
			{
				cityName: "上海市",
				lineName: "地铁5号线(莘庄-闵行开发区)",
				stepName: "闵行开发区"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "浦东国际机场"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "海天三路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "远东大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "凌空路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "川沙"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "华夏东路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "创新中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "唐镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁2号线东延伸段(浦东国际机场-广兰路)",
				stepName: "广兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "富锦路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "友谊西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "宝安公路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "共富新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "呼兰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "通河新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "共康路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "彭浦新村"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "汶水路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "上海马戏城"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "延长路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "中山北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "上海火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "汉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "新闸路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "人民广场"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "黄陂南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "陕西南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "常熟路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "衡山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "徐家汇"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "上海体育馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "漕宝路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "上海南站"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "锦江乐园"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "莲花路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "外环路"
			},
			{
				cityName: "上海市",
				lineName: "地铁1号线(富锦路-莘庄)",
				stepName: "莘庄"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "上海南站"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "石龙路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "龙漕路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "漕溪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "宜山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "虹桥路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "延安西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "中山公园"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "金沙江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "曹杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "镇坪路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "中潭路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "上海火车站"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "宝山路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "东宝兴路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "虹口足球场"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "赤峰路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "大柏树"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "江湾镇"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "殷高西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "长江南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "淞发路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "张华浜"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "淞滨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "水产路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "宝杨路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "友谊路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "铁力路"
			},
			{
				cityName: "上海市",
				lineName: "地铁3号线(上海南站-江杨北路)",
				stepName: "江杨北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "世博大道"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "世博会博物馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "马当路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "新天地"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "淮海中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "南京西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "自然博物馆"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "汉中路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "江宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "长寿路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "武宁路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "隆德路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "金沙江路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "大渡河路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "真北路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "祁连山南路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "丰庄"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "金沙江西路"
			},
			{
				cityName: "上海市",
				lineName: "地铁13号线(世博大道-金运路)",
				stepName: "金运路"
			},
			{
				cityName: "上海市",
				lineName: "磁悬浮(浦东国际机场-龙阳路)",
				stepName: "浦东国际机场"
			},
			{
				cityName: "上海市",
				lineName: "磁悬浮(浦东国际机场-龙阳路)",
				stepName: "龙阳路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "东方绿舟"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "朱家角"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "淀山湖大道"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "漕盈路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "青浦新城"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "汇金路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "赵巷"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "嘉松中路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "徐泾北城"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "徐盈路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "蟠龙路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "诸光路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(东方绿舟-虹桥火车站)",
				stepName: "虹桥火车站"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "虹桥火车站"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "诸光路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "蟠龙路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "徐盈路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "徐泾北城"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "嘉松中路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "赵巷"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "汇金路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "青浦新城"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "漕盈路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "淀山湖大道"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "朱家角"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通17号线(虹桥火车站-东方绿舟)",
				stepName: "东方绿舟"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(汇臻路-沈杜公路)",
				stepName: "汇臻路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(汇臻路-沈杜公路)",
				stepName: "东城一路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(汇臻路-沈杜公路)",
				stepName: "浦航路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(汇臻路-沈杜公路)",
				stepName: "闵瑞路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(汇臻路-沈杜公路)",
				stepName: "三鲁公路"
			},
			{
				cityName: "上海市",
				lineName: "轨道交通浦江线(汇臻路-沈杜公路)",
				stepName: "沈杜公路"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "广州南站"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "石壁"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "谢村"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "钟村"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "汉溪长隆"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "南村万博"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "员岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "板桥"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(广州南站-大学城南)",
				stepName: "大学城南"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "高增"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "清塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "清布"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "莲塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "马鞍山公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "花都广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "花果山公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "花城路"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "广州北站"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "花都汽车城"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(高增-飞鹅岭)",
				stepName: "飞鹅岭"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "新沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "官湖"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "新塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "白江"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "沙村"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "南岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "夏园"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "南海神庙"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "双岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "裕丰围"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(新沙-鱼珠)",
				stepName: "鱼珠"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "香雪"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "萝岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "苏元"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "暹岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "金峰"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "黄陂"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "高塘石"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "柯木塱"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "龙洞"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "植物园"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "长湴"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "天河客运站"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "燕塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "天平架"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "沙河顶"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "黄花岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "区庄"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "东山口"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "东湖"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "团一大广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "北京路"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "海珠广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "一德路"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "文化公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "黄沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "如意坊"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "坦尾"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "河沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "沙贝"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "横沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(香雪-浔峰岗)",
				stepName: "浔峰岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "浔峰岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "横沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "沙贝"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "河沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "坦尾"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "如意坊"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "黄沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "文化公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "一德路"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "海珠广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "北京路"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "团一大广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "东湖"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "东山口"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "区庄"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "黄花岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "沙河顶"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "天平架"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "燕塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "天河客运站"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "长湴"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "植物园"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "龙洞"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "柯木塱"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "高塘石"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "黄陂"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "金峰"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "暹岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "苏元"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "萝岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁6号线(浔峰岗-香雪)",
				stepName: "香雪"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "大学城南"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "板桥"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "员岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "南村万博"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "汉溪长隆"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "钟村"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "谢村"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "石壁"
			},
			{
				cityName: "广州市",
				lineName: "地铁7号线(大学城南-广州南站)",
				stepName: "广州南站"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "新和"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "红卫"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "新南"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "枫下"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "知识城"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "何棠下"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "旺村"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "汤村"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "镇龙北"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(新和-镇龙)",
				stepName: "镇龙"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "镇龙"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "镇龙北"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "汤村"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "旺村"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "何棠下"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "知识城"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "枫下"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "新南"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "红卫"
			},
			{
				cityName: "广州市",
				lineName: "知识城线(镇龙-新和)",
				stepName: "新和"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "飞鹅岭"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "花都汽车城"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "广州北站"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "花城路"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "花果山公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "花都广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "马鞍山公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "莲塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "清布"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "清塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁9号线(飞鹅岭-高增)",
				stepName: "高增"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "鱼珠"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "裕丰围"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "双岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "南海神庙"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "夏园"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "南岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "沙村"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "白江"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "新塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "官湖"
			},
			{
				cityName: "广州市",
				lineName: "地铁13号线(鱼珠-新沙)",
				stepName: "新沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "广州南站"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "石壁"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "会江"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "南浦"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "洛溪"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "南洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "东晓南"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "江泰路"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "昌岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "江南西"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "市二宫"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "海珠广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "公园前"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "纪念堂"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "越秀公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "广州火车站"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "三元里"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "飞翔公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "白云公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "白云文化广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "萧岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "江夏"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "黄边"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(广州南站-嘉禾望岗)",
				stepName: "嘉禾望岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "南沙客运港"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "南横"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "塘坑"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "大涌"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "广隆"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "飞沙角"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "金洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "蕉门"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "黄阁"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "黄阁汽车城"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "庆盛"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "东涌"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "低涌"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "海傍"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "石碁"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "新造"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "大学城南"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "大学城北"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "官洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "万胜围"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "车陂南"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "车陂"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(南沙客运港-黄村)",
				stepName: "黄村"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "番禺广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "市桥"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "汉溪长隆"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "大石"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "厦滘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "沥滘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "大塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "客村"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "广州塔"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "珠江新城"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "体育西路"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "石牌桥"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "岗顶"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "华师"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "五山"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(番禺广场-天河客运站)",
				stepName: "天河客运站"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "西朗"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "坑口"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "花地湾"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "芳村"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "黄沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "长寿路"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "陈家祠"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "西门口"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "公园前"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "农讲所"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "烈士陵园"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "东山口"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "杨箕"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "体育西路"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "体育中心"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(西朗-广州东站)",
				stepName: "广州东站"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "文冲"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "大沙东"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "大沙地"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "鱼珠"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "三溪"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "东圃"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "车陂南"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "科韵路"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "员村"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "潭村"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "猎德"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "珠江新城"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "五羊邨"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "杨箕"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "动物园"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "区庄"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "淘金"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "小北"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "广州火车站"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "西村"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "西场"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "中山八"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "坦尾"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(文冲-滘口)",
				stepName: "滘口"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "黄村"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "车陂"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "车陂南"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "万胜围"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "官洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "大学城北"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "大学城南"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "新造"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "石碁"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "海傍"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "低涌"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "东涌"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "庆盛"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "黄阁汽车城"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "黄阁"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "蕉门"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "金洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "飞沙角"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "广隆"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "大涌"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "塘坑"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "南横"
			},
			{
				cityName: "广州市",
				lineName: "地铁4号线(黄村-南沙客运港)",
				stepName: "南沙客运港"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "林和西"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "体育中心南"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "天河南"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "黄埔大道"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "妇儿中心"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "花城大道"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "大剧院"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "海心沙"
			},
			{
				cityName: "广州市",
				lineName: "apm线(林和西-广州塔)",
				stepName: "广州塔"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "燕岗"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "沙园"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "沙涌"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "鹤洞"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "西朗"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "菊树"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "龙溪"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "金融高新区"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "千灯湖"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "礌岗"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "南桂路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "桂城"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "朝安"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "普君北路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "祖庙"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "同济路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "季华园"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "魁奇路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "澜石"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "世纪莲"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "东平"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "新城东"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "凤凰新村"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "沙园"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "宝岗大道"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "昌岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "晓港"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "中大"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "鹭江"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "客村"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "赤岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "磨碟沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "新港东"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "琶洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(凤凰新村-万胜围)",
				stepName: "万胜围"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "广州东站"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "体育中心"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "体育西路"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "杨箕"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "东山口"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "烈士陵园"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "农讲所"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "公园前"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "西门口"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "陈家祠"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "长寿路"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "黄沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "芳村"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "花地湾"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "坑口"
			},
			{
				cityName: "广州市",
				lineName: "地铁1号线(广州东站-西朗)",
				stepName: "西朗"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "新城东"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "东平"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "世纪莲"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "澜石"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "魁奇路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "季华园"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "同济路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "祖庙"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "普君北路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "朝安"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "桂城"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "南桂路"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "礌岗"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "千灯湖"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "金融高新区"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "龙溪"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "菊树"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "西朗"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "鹤洞"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "沙涌"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "沙园"
			},
			{
				cityName: "广州市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "燕岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "万胜围"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "琶洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "新港东"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "磨碟沙"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "赤岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "客村"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "鹭江"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "中大"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "晓港"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "昌岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "宝岗大道"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "沙园"
			},
			{
				cityName: "广州市",
				lineName: "地铁8号线(万胜围-凤凰新村)",
				stepName: "凤凰新村"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "天河客运站"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "五山"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "华师"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "岗顶"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "石牌桥"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "体育西路"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "珠江新城"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "广州塔"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "客村"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "大塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "沥滘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "厦滘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "大石"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "汉溪长隆"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "市桥"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线(天河客运站-番禺广场)",
				stepName: "番禺广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "嘉禾望岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "黄边"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "江夏"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "萧岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "白云文化广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "白云公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "飞翔公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "三元里"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "广州火车站"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "越秀公园"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "纪念堂"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "公园前"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "海珠广场"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "市二宫"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "江南西"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "昌岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "江泰路"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "东晓南"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "南洲"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "洛溪"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "南浦"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "会江"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "石壁"
			},
			{
				cityName: "广州市",
				lineName: "地铁2号线(嘉禾望岗-广州南站)",
				stepName: "广州南站"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "体育西路"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "林和西"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "广州东站"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "燕塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "梅花园"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "京溪南方医院"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "同和"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "永泰"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "白云大道北"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "嘉禾望岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "龙归"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "人和"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "高增"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "机场南(1号航站楼)"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(体育西路-机场北(2号航站楼))",
				stepName: "机场北(2号航站楼)"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "滘口"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "坦尾"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "中山八"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "西场"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "西村"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "广州火车站"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "小北"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "淘金"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "区庄"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "动物园"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "杨箕"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "五羊邨"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "珠江新城"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "猎德"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "潭村"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "员村"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "科韵路"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "车陂南"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "东圃"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "三溪"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "鱼珠"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "大沙地"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "大沙东"
			},
			{
				cityName: "广州市",
				lineName: "地铁5号线(滘口-文冲)",
				stepName: "文冲"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "机场北(2号航站楼)"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "机场南(1号航站楼)"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "高增"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "人和"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "龙归"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "嘉禾望岗"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "白云大道北"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "永泰"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "同和"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "京溪南方医院"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "梅花园"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "燕塘"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "广州东站"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "林和西"
			},
			{
				cityName: "广州市",
				lineName: "地铁3号线北延段(机场北(2号航站楼)-体育西路)",
				stepName: "体育西路"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "广州塔"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "海心沙"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "大剧院"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "花城大道"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "妇儿中心"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "黄埔大道"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "天河南"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "体育中心南"
			},
			{
				cityName: "广州市",
				lineName: "apm线(广州塔-林和西)",
				stepName: "林和西"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "太安"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "田贝"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "洪湖"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "笋岗"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "红岭北"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "八卦岭"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "黄木岗"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "华新"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "华强北"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "华强南"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "赤尾"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "皇岗口岸"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "福民"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "皇岗村"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "石厦"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "沙尾"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "上沙"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "农林"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "安托山"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "深云"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "桃源村"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "龙井"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "珠光"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "茶光"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "西丽"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(太安-西丽湖)",
				stepName: "西丽湖"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "红树湾南"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "深湾"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "深圳湾公园"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "下沙"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "香梅"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "景田"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "梅景"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "下梅林"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "梅村"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "上梅林"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "孖岭"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "银湖"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "泥岗"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "红岭北"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "园岭"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "红岭"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "红岭南"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "鹿丹村"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "人民南"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "向西村"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(红树湾南-文锦)",
				stepName: "文锦"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "西丽湖"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "西丽"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "茶光"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "珠光"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "龙井"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "桃源村"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "深云"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "安托山"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "农林"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "上沙"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "沙尾"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "石厦"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "皇岗村"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "福民"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "皇岗口岸"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "赤尾"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "华强南"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "华强北"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "华新"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "黄木岗"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "八卦岭"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "红岭北"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "笋岗"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "洪湖"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "田贝"
			},
			{
				cityName: "深圳市",
				lineName: "7号线(西丽湖-太安)",
				stepName: "太安"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "福田"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "红树湾南"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "后海"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "南山"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "前海湾"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "宝安"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "碧海湾"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "机场"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "机场北"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "福永"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "桥头"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "塘尾"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "马安山"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "沙井"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "后亭"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "松岗"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(福田-碧头)",
				stepName: "碧头"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "文锦"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "向西村"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "人民南"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "鹿丹村"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "红岭南"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "红岭"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "园岭"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "红岭北"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "泥岗"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "银湖"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "孖岭"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "上梅林"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "梅村"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "下梅林"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "梅景"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "景田"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "香梅"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "下沙"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "深圳湾公园"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "深湾"
			},
			{
				cityName: "深圳市",
				lineName: "9号线(文锦-红树湾南)",
				stepName: "红树湾南"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "碧头"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "松岗"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "后亭"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "沙井"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "马安山"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "塘尾"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "桥头"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "福永"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "机场北"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "机场"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "碧海湾"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "宝安"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "前海湾"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "南山"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "后海"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "红树湾南"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "11号线(碧头-福田)",
				stepName: "福田"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "罗湖"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "国贸"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "老街"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "大剧院"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "科学馆"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "华强路"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "岗厦"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "会展中心"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "购物公园"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "香蜜湖"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "竹子林"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "侨城东"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "华侨城"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "世界之窗"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "白石洲"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "高新园"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "深大"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "桃园"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "大新"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "鲤鱼门"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "前海湾"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "新安"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "宝安中心"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "宝体"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "坪洲"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "西乡"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "固戍"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "后瑞"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(罗湖-机场东)",
				stepName: "机场东"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "机场东"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "后瑞"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "固戍"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "西乡"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "坪洲"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "宝体"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "宝安中心"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "新安"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "前海湾"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "鲤鱼门"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "大新"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "桃园"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "深大"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "高新园"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "白石洲"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "世界之窗"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "华侨城"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "侨城东"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "竹子林"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "车公庙"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "香蜜湖"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "购物公园"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "会展中心"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "岗厦"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "华强路"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "科学馆"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "大剧院"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "老街"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "国贸"
			},
			{
				cityName: "深圳市",
				lineName: "1号线(罗宝线)(机场东-罗湖)",
				stepName: "罗湖"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "福田口岸"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "福民"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "会展中心"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "市民中心"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "少年宫"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "莲花北"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "上梅林"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "民乐"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "白石龙"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "深圳北站"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "红山"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "上塘"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "龙胜"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "龙华"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(福田口岸-清湖)",
				stepName: "清湖"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "清湖"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "龙华"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "龙胜"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "上塘"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "红山"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "深圳北站"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "白石龙"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "民乐"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "上梅林"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "莲花北"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "少年宫"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "市民中心"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "会展中心"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "福民"
			},
			{
				cityName: "深圳市",
				lineName: "4号线(龙华线)(清湖-福田口岸)",
				stepName: "福田口岸"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "赤湾"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "蛇口港"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "海上世界"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "水湾"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "东角头"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "湾厦"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "海月"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "登良"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "后海"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "科苑"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "红树湾"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "世界之窗"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "侨城北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "深康"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "安托山"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "侨香"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "香蜜"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "香梅北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "景田"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "莲花西"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "福田"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "市民中心"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "岗厦北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "华强北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "燕南"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "大剧院"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "湖贝"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "黄贝岭"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(赤湾-新秀)",
				stepName: "新秀"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "新秀"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "黄贝岭"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "湖贝"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "大剧院"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "燕南"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "华强北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "岗厦北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "市民中心"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "福田"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "莲花西"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "景田"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "香梅北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "香蜜"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "侨香"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "安托山"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "深康"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "侨城北"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "世界之窗"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "红树湾"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "科苑"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "后海"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "登良"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "海月"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "湾厦"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "东角头"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "水湾"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "海上世界"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "蛇口港"
			},
			{
				cityName: "深圳市",
				lineName: "2号线(蛇口线)(新秀-赤湾)",
				stepName: "赤湾"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "益田"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "石厦"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "购物公园"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "福田"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "少年宫"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "莲花村"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "华新"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "通新岭"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "红岭"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "老街"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "晒布"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "翠竹"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "田贝"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "水贝"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "草埔"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "布吉"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "木棉湾"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "大芬"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "丹竹头"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "六约"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "塘坑"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "横岗"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "永湖"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "荷坳"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "大运"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "爱联"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "吉祥"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "龙城广场"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "南联"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(益田-双龙)",
				stepName: "双龙"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "黄贝岭"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "怡景"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "太安"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "布心"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "百鸽笼"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "布吉"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "长龙"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "下水径"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "上水径"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "杨美"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "坂田"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "五和"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "民治"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "深圳北站"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "长岭陂"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "塘朗"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "大学城"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "西丽"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "留仙洞"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "兴东"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "洪浪北"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "灵芝"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "翻身"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "宝安中心"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "宝华"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "临海"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(黄贝岭-前海湾)",
				stepName: "前海湾"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "前海湾"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "临海"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "宝华"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "宝安中心"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "翻身"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "灵芝"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "洪浪北"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "兴东"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "留仙洞"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "西丽"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "大学城"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "塘朗"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "长岭陂"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "深圳北站"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "民治"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "五和"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "坂田"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "杨美"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "上水径"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "下水径"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "长龙"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "布吉"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "百鸽笼"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "布心"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "太安"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "怡景"
			},
			{
				cityName: "深圳市",
				lineName: "5号线(环中线)(前海湾-黄贝岭)",
				stepName: "黄贝岭"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "双龙"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "南联"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "龙城广场"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "吉祥"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "爱联"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "大运"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "荷坳"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "永湖"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "横岗"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "塘坑"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "六约"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "丹竹头"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "大芬"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "木棉湾"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "布吉"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "草埔"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "水贝"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "田贝"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "翠竹"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "晒布"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "老街"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "红岭"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "通新岭"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "华新"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "莲花村"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "少年宫"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "福田"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "购物公园"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "石厦"
			},
			{
				cityName: "深圳市",
				lineName: "3号线(龙岗线)(双龙-益田)",
				stepName: "益田"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "园博中心"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "丹鹤"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "湖霞街"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "重光"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "和睦路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "人和"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "幸福广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "冉家坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(园博中心-大龙山)",
				stepName: "大龙山"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(举人坝-碧津)",
				stepName: "举人坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(举人坝-碧津)",
				stepName: "莲花"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(举人坝-碧津)",
				stepName: "观月路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(举人坝-碧津)",
				stepName: "高堡湖"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(举人坝-碧津)",
				stepName: "空港广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(举人坝-碧津)",
				stepName: "双凤桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(举人坝-碧津)",
				stepName: "碧津"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(碧津-举人坝)",
				stepName: "碧津"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(碧津-举人坝)",
				stepName: "双凤桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(碧津-举人坝)",
				stepName: "空港广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(碧津-举人坝)",
				stepName: "高堡湖"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(碧津-举人坝)",
				stepName: "观月路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(碧津-举人坝)",
				stepName: "莲花"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线北延伸线(碧津-举人坝)",
				stepName: "举人坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "鲤鱼池"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "红土地"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "龙头寺公园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "重庆北站北广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "民心佳园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "三亚湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "上湾路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "环山公园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "长河"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "江北机场T3航站楼"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "江北机场T2航站楼"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "渝北广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "鹿山"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "中央公园东"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "中央公园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "中央公园西"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "悦来"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(鲤鱼池-王家庄)",
				stepName: "王家庄"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(礼嘉-悦来)",
				stepName: "礼嘉"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(礼嘉-悦来)",
				stepName: "欢乐谷"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(礼嘉-悦来)",
				stepName: "黄茅坪"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(礼嘉-悦来)",
				stepName: "高义口"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(礼嘉-悦来)",
				stepName: "国博中心"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(礼嘉-悦来)",
				stepName: "悦来"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "较场口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "临江门"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "黄花园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "大溪沟"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "曾家岩"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "牛角沱"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "李子坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "佛图关"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "大坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "袁家岗"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "谢家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "杨家坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "动物园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "大堰村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "马王场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "平安"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "大渡口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "新山村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "天堂堡"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "建桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "金家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "刘家坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "白居寺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "大江"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(较场口-鱼洞)",
				stepName: "鱼洞"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "鱼洞"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "金竹"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "鱼胡路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "学堂湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "大山村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "花溪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "岔路口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "九公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "麒龙"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "八公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "二塘"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "六公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "五公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "四公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "南坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "工贸"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "铜元局"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "两路口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "牛角沱"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "华新街"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "观音桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "红旗河沟"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "嘉州路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "郑家院子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "唐家院子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "狮子坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "重庆北站南广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "龙头寺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "童家院子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "金渝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "金童路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "鸳鸯"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "园博园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "翠云"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "长福路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "回兴"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "双龙"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "碧津"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(鱼洞-江北机场t2航站楼)",
				stepName: "江北机场T2航站楼"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "江北机场T2航站楼"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "碧津"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "双龙"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "回兴"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "长福路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "翠云"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "园博园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "鸳鸯"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "金童路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "金渝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "童家院子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "龙头寺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "重庆北站南广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "狮子坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "唐家院子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "郑家院子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "嘉州路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "红旗河沟"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "观音桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "华新街"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "牛角沱"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "两路口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "铜元局"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "工贸"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "南坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "四公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "五公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "六公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "二塘"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "八公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "麒龙"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "九公里"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "岔路口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "花溪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "大山村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "学堂湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "鱼胡路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "金竹"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通3号线(江北机场t2航站楼-鱼洞)",
				stepName: "鱼洞"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "鱼洞"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "大江"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "白居寺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "刘家坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "金家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "建桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "天堂堡"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "新山村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "大渡口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "平安"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "马王场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "大堰村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "动物园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "杨家坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "谢家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "袁家岗"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "大坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "佛图关"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "李子坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "牛角沱"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "曾家岩"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "大溪沟"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "黄花园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "临江门"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通2号线(鱼洞-较场口)",
				stepName: "较场口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "尖顶坡"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "大学城"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "陈家桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "微电园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "赖家桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "双碑"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "石井坡"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "磁器口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "烈士墓"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "杨公桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "沙坪坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "小龙坎"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "马家岩"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "高庙村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "石桥铺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "歇台子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "石油路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "大坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "鹅岭"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "两路口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "七星岗"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "较场口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(尖顶坡-小什字)",
				stepName: "小什字"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "北碚"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "天生"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "状元碑"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "龙凤溪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "向家岗"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "蔡家"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "曹家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "金山寺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "礼嘉"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "九曲河"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "康庄"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "大竹林"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "光电园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "冉家坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "大龙山"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "花卉园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "红旗河沟"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "黄泥塝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "红土地"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "五里店"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "江北城"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "大剧院"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "小什字"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "上新街"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "刘家坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "长生桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "邱家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(北碚-茶园)",
				stepName: "茶园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "小什字"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "较场口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "七星岗"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "两路口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "鹅岭"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "大坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "石油路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "歇台子"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "石桥铺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "高庙村"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "马家岩"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "小龙坎"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "沙坪坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "杨公桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "烈士墓"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "磁器口"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "石井坡"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "双碑"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "赖家桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "微电园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "陈家桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "大学城"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通1号线(小什字-尖顶坡)",
				stepName: "尖顶坡"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(悦来-礼嘉)",
				stepName: "悦来"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(悦来-礼嘉)",
				stepName: "国博中心"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(悦来-礼嘉)",
				stepName: "高义口"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(悦来-礼嘉)",
				stepName: "黄茅坪"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(悦来-礼嘉)",
				stepName: "欢乐谷"
			},
			{
				cityName: "重庆市",
				lineName: "国博线(悦来-礼嘉)",
				stepName: "礼嘉"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "茶园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "邱家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "长生桥"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "刘家坪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "上新街"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "小什字"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "大剧院"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "江北城"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "五里店"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "红土地"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "黄泥塝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "红旗河沟"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "花卉园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "大龙山"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "冉家坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "光电园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "大竹林"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "康庄"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "九曲河"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "礼嘉"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "金山寺"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "曹家湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "蔡家"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "向家岗"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "龙凤溪"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "状元碑"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "天生"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通6号线(茶园-北碚)",
				stepName: "北碚"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "大龙山"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "冉家坝"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "幸福广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "人和"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "和睦路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "重光"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "湖霞街"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "丹鹤"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通5号线(大龙山-园博中心)",
				stepName: "园博中心"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "王家庄"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "悦来"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "中央公园西"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "中央公园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "中央公园东"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "鹿山"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "渝北广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "江北机场T2航站楼"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "江北机场T3航站楼"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "长河"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "环山公园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "上湾路"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "三亚湾"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "民心佳园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "重庆北站北广场"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "龙头寺公园"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "红土地"
			},
			{
				cityName: "重庆市",
				lineName: "轨道交通10号线(王家庄-鲤鱼池)",
				stepName: "鲤鱼池"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "梅林路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "洞庭路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "解放南路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "梅江会展中心"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "梅江公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "左江道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "梅江道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "黑牛城道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "尖山路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "乐园道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "文化中心"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "天津宾馆"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "肿瘤医院"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "水上公园东路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "南翠屏"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "迎风道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "红旗南路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "一中心医院"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "天拖"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "鞍山西道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "宜宾道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "长虹公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "人民医院"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "复兴路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "西站"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "北竹林"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "天泰路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "外院附中"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "新开河"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "北站"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "北宁公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "民权门"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "金钟河大街"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "徐庄子"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "金钟街"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "大毕庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "南何庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(梅林路-南孙庄)",
				stepName: "南孙庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "南孙庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "南何庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "大毕庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "金钟街"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "徐庄子"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "金钟河大街"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "民权门"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "北宁公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "北站"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "新开河"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "外院附中"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "天泰路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "北竹林"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "西站"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "复兴路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "人民医院"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "长虹公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "宜宾道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "鞍山西道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "天拖"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "一中心医院"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "红旗南路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "迎风道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "南翠屏"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "水上公园东路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "肿瘤医院"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "天津宾馆"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "文化中心"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "乐园道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "尖山路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "黑牛城道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "梅江道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "左江道"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "梅江公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "梅江会展中心"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "解放南路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "洞庭路"
			},
			{
				cityName: "天津市",
				lineName: "地铁6号线(南孙庄-梅林路)",
				stepName: "梅林路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "南站"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "杨伍庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "学府工业区"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "高新区"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "大学城"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "华苑"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "王顶堤"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "红旗南路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "周邓纪念馆"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "天塔"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "吴家窑"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "西康路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "营口道"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "和平路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "津湾广场"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "天津站"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "金狮桥"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "中山路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "北站"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "铁东路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "张兴庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "宜兴埠"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "天士力"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "华北集团"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "丰产河"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(南站-小淀)",
				stepName: "小淀"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "小淀"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "丰产河"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "华北集团"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "天士力"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "宜兴埠"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "张兴庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "铁东路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "北站"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "中山路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "金狮桥"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "天津站"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "津湾广场"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "和平路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "营口道"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "西康路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "吴家窑"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "天塔"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "周邓纪念馆"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "红旗南路"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "王顶堤"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "华苑"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "大学城"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "高新区"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "学府工业区"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "杨伍庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁3号线(小淀-南站)",
				stepName: "南站"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "滨海国际机场"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "空港经济区"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "国山路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "登州路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "屿东城"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "翠阜新村"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "靖江路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "顺驰桥"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "远洋国际中心"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "天津站"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "建国道"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "东南角"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "鼓楼"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "西南角"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "广开四马路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "长虹公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "咸阳路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "芥园西道"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "卞兴"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(滨海国际机场-曹庄)",
				stepName: "曹庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "曹庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "卞兴"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "芥园西道"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "咸阳路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "长虹公园"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "广开四马路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "西南角"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "鼓楼"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "东南角"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "建国道"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "天津站"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "远洋国际中心"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "顺驰桥"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "靖江路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "翠阜新村"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "屿东城"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "登州路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "国山路"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "空港经济区"
			},
			{
				cityName: "天津市",
				lineName: "地铁2号线(曹庄-滨海国际机场)",
				stepName: "滨海国际机场"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "东海路"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "会展中心"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "太湖路"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "市民广场"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "泰达"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "塘沽"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "胡家园"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "钢管公司"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "军粮城"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "小东庄"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "东丽开发区"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "新立"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "张贵庄"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "二号桥"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "一号桥"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "中山门"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "东兴路"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "直沽"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "十一经路"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "大王庄"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(东海路-天津站)",
				stepName: "天津站"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "财经大学"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "华山里"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "复兴门"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "陈塘庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "土城"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "南楼"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "下瓦房"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "小白楼"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "营口道"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "鞍山道"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "海光寺"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "二纬路"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "西南角"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "西北角"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "西站"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "洪湖里"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "勤俭道"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "本溪路"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "果酒厂"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "西横堤"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(财经大学-刘园)",
				stepName: "刘园"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "刘园"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "西横堤"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "果酒厂"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "本溪路"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "勤俭道"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "洪湖里"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "西站"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "西北角"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "西南角"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "二纬路"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "海光寺"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "鞍山道"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "营口道"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "小白楼"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "下瓦房"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "南楼"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "土城"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "陈塘庄"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "复兴门"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "华山里"
			},
			{
				cityName: "天津市",
				lineName: "地铁1号线(刘园-财经大学)",
				stepName: "财经大学"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "天津站"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "大王庄"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "十一经路"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "直沽"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "东兴路"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "中山门"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "一号桥"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "二号桥"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "张贵庄"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "新立"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "东丽开发区"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "小东庄"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "军粮城"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "钢管公司"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "胡家园"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "塘沽"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "泰达"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "市民广场"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "太湖路"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "会展中心"
			},
			{
				cityName: "天津市",
				lineName: "津滨轻轨地铁9号线(天津站-东海路)",
				stepName: "东海路"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(石家庄站-市二中)",
				stepName: "石家庄站"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(石家庄站-市二中)",
				stepName: "西三教"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(石家庄站-市二中)",
				stepName: "槐安桥"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(石家庄站-市二中)",
				stepName: "东里"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(石家庄站-市二中)",
				stepName: "新百广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(石家庄站-市二中)",
				stepName: "市二中"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "洨河大道"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "南村"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "石家庄东"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "火炬广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "留村"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "白佛"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "朝晖桥"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "谈固"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "北宋"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "体育场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "博物院"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "北国商城"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "平安大街"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "解放广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "新百广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "烈士陵园"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "和平医院"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "长城桥"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "时光街"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(洨河大道-西王)",
				stepName: "西王"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "西王"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "时光街"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "长城桥"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "和平医院"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "烈士陵园"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "新百广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "解放广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "平安大街"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "北国商城"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "博物院"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "体育场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "北宋"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "谈固"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "朝晖桥"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "白佛"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "留村"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "火炬广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "石家庄东"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "南村"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁1号线(西王-洨河大道)",
				stepName: "洨河大道"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(市二中-石家庄站)",
				stepName: "市二中"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(市二中-石家庄站)",
				stepName: "新百广场"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(市二中-石家庄站)",
				stepName: "东里"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(市二中-石家庄站)",
				stepName: "槐安桥"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(市二中-石家庄站)",
				stepName: "西三教"
			},
			{
				cityName: "石家庄市",
				lineName: "地铁3号线(市二中-石家庄站)",
				stepName: "石家庄站"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(高淳-翔宇路南)",
				stepName: "高淳"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(高淳-翔宇路南)",
				stepName: "团结圩"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(高淳-翔宇路南)",
				stepName: "明觉"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(高淳-翔宇路南)",
				stepName: "石湫"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(高淳-翔宇路南)",
				stepName: "铜山"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(高淳-翔宇路南)",
				stepName: "翔宇路南"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "高家冲"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "林山"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "桥林新城"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "石碛河"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "双垅"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "兰花塘"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "马骡圩"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "刘村"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "天保"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "高庙路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "吴侯街"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "平良大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "永初路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "油坊桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "贾西"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "春江路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "铁心桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "景明佳园"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(高家冲-南京南站)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "无想山"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "幸庄"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "中山湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "溧水"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "卧龙湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "群力"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "空港新城溧水"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "柘塘"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(无想山-空港新城江宁)",
				stepName: "空港新城江宁"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "龙江"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "草场门·二师·南艺"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "云南路"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "鼓楼"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "鸡鸣寺"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "九华山"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "岗子村"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "蒋王庙"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "王家湾"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "聚宝山"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "徐庄·苏宁总部"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "金马路"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "汇通路"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "灵山"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "东流"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "孟北"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "西岗桦墅"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(龙江-仙林湖)",
				stepName: "仙林湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(翔宇路南-高淳)",
				stepName: "翔宇路南"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(翔宇路南-高淳)",
				stepName: "铜山"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(翔宇路南-高淳)",
				stepName: "石湫"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(翔宇路南-高淳)",
				stepName: "明觉"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(翔宇路南-高淳)",
				stepName: "团结圩"
			},
			{
				cityName: "南京市",
				lineName: "地铁s9号线(翔宇路南-高淳)",
				stepName: "高淳"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "仙林湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "西岗桦墅"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "孟北"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "东流"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "灵山"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "汇通路"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "金马路"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "徐庄·苏宁总部"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "聚宝山"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "王家湾"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "蒋王庙"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "岗子村"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "九华山"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "鸡鸣寺"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "鼓楼"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "云南路"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "草场门·二师·南艺"
			},
			{
				cityName: "南京市",
				lineName: "地铁4号线(仙林湖-龙江)",
				stepName: "龙江"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "空港新城江宁"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "柘塘"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "空港新城溧水"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "群力"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "卧龙湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "溧水"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "中山湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "幸庄"
			},
			{
				cityName: "南京市",
				lineName: "地铁s7号线(空港新城江宁-无想山)",
				stepName: "无想山"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "经天路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "南大仙林校区"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "羊山公园"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "仙林中心"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "学则路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "仙鹤门"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "金马路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "马群"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "钟灵街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "孝陵卫"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "下马坊"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "苜蓿园"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "明故宫"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "西安门"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "大行宫"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "新街口"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "上海路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "汉中门"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "莫愁湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "云锦路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "集庆门大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "兴隆大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "奥体东"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "元通"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "雨润大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(经天路-油坊桥)",
				stepName: "油坊桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "金牛湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "八百桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "沈桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "方州广场"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "凤凰山公园"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "雄州"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "龙池"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "六合开发区"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "化工园"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "长芦"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "葛塘"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "大厂"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "卸甲甸"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "信息工程大学"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "高新开发区"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "泰冯路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(金牛湖-泰山新村)",
				stepName: "泰山新村"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "秣周东路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "东大九龙湖校区"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "诚信大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "九龙湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "天元西路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "胜太西路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "宏运大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "明发广场"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "大明路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "卡子门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "雨花门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "武定门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "夫子庙"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "常府街"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "大行宫"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "浮桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "鸡鸣寺"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "南京林业大学·新庄"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "南京站"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "小市"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "五塘广场"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "上元门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "柳洲东路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "天润城"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "泰冯路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "东大成贤学院"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "星火路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(秣周东路-林场)",
				stepName: "林场"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "空港新城江宁"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "禄口机场"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "翔宇路南"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "翔宇路北"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "正方中路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "吉印大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "河海大学·佛城西路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "翠屏山"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(空港新城江宁-南京南站)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "林场"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "星火路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "东大成贤学院"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "泰冯路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "天润城"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "柳洲东路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "上元门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "五塘广场"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "小市"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "南京站"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "南京林业大学·新庄"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "鸡鸣寺"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "浮桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "大行宫"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "常府街"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "夫子庙"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "武定门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "雨花门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "卡子门"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "大明路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "明发广场"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "宏运大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "胜太西路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "天元西路"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "九龙湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "诚信大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "东大九龙湖校区"
			},
			{
				cityName: "南京市",
				lineName: "地铁3号线(林场-秣周东路)",
				stepName: "秣周东路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "泰山新村"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "泰冯路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "高新开发区"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "信息工程大学"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "卸甲甸"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "大厂"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "葛塘"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "长芦"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "化工园"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "六合开发区"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "龙池"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "雄州"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "凤凰山公园"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "方州广场"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "沈桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "八百桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s8号线(泰山新村-金牛湖)",
				stepName: "金牛湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "迈皋桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "红山动物园"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "南京站"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "新模范马路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "玄武门"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "鼓楼"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "珠江路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "新街口"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "张府园"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "三山街"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "中华门"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "安德门"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "天隆寺"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "软件大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "花神庙"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "双龙大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "河定桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "胜太路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "百家湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "小龙湾"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "竹山路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "天印大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "龙眠大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "南医大·江苏经贸学院"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "南京交院"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(迈皋桥-中国药科大学)",
				stepName: "中国药科大学"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "雨山路"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "文德路"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "龙华路"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "南京工业大学"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "浦口万汇城"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "临江"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "江心洲"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "绿博园"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "梦都大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "奥体中心"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "元通"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "中胜"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "小行"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(雨山路-安德门)",
				stepName: "安德门"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "翠屏山"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "河海大学·佛城西路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "吉印大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "正方中路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "翔宇路北"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "翔宇路南"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "禄口机场"
			},
			{
				cityName: "南京市",
				lineName: "地铁s1号线(南京南站-空港新城江宁)",
				stepName: "空港新城江宁"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "油坊桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "雨润大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "元通"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "奥体东"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "兴隆大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "集庆门大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "云锦路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "莫愁湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "汉中门"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "上海路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "新街口"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "大行宫"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "西安门"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "明故宫"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "苜蓿园"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "下马坊"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "孝陵卫"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "钟灵街"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "马群"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "金马路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "仙鹤门"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "学则路"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "仙林中心"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "羊山公园"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "南大仙林校区"
			},
			{
				cityName: "南京市",
				lineName: "地铁2号线(油坊桥-经天路)",
				stepName: "经天路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "中国药科大学"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "南京交院"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "南医大·江苏经贸学院"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "龙眠大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "天印大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "竹山路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "小龙湾"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "百家湖"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "胜太路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "河定桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "双龙大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "花神庙"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "软件大道"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "天隆寺"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "安德门"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "中华门"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "三山街"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "张府园"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "新街口"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "珠江路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "鼓楼"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "玄武门"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "新模范马路"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "南京站"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "红山动物园"
			},
			{
				cityName: "南京市",
				lineName: "地铁1号线(中国药科大学-迈皋桥)",
				stepName: "迈皋桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "安德门"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "小行"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "中胜"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "元通"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "奥体中心"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "梦都大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "绿博园"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "江心洲"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "临江"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "浦口万汇城"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "南京工业大学"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "龙华路"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "文德路"
			},
			{
				cityName: "南京市",
				lineName: "地铁10号线(安德门-雨山路)",
				stepName: "雨山路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "南京南站"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "景明佳园"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "铁心桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "春江路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "贾西"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "油坊桥"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "永初路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "平良大街"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "吴侯街"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "高庙路"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "天保"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "刘村"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "马骡圩"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "兰花塘"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "双垅"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "石碛河"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "桥林新城"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "林山"
			},
			{
				cityName: "南京市",
				lineName: "地铁s3号线(南京南站-高家冲)",
				stepName: "高家冲"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(双流机场2航站楼-太平园)",
				stepName: "双流机场2航站楼"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(双流机场2航站楼-太平园)",
				stepName: "双流机场1航站楼"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(双流机场2航站楼-太平园)",
				stepName: "金花"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(双流机场2航站楼-太平园)",
				stepName: "华兴"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(双流机场2航站楼-太平园)",
				stepName: "簇锦"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(双流机场2航站楼-太平园)",
				stepName: "太平园"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "万盛"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "杨柳河"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "凤溪河"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "南熏大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "光华公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "涌泉"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "凤凰大街"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "马厂坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "非遗博览园"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "蔡桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "中坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "成都西站"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "清江西路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "文化宫"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "西南财大"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "草堂北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "中医大省医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "宽窄巷子"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "骡马市"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "太升南路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "市二医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "玉双路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "双桥路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "万年场"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "槐树店"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "来龙"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "十陵"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "成都大学"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "明蜀王陵"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(万盛-西河)",
				stepName: "西河"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "崔家店"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "双店路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "槐树店"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "迎晖路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "成都东客站"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "大观"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "狮子山"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "四川师大"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "琉璃场"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "三瓦窑"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "火车南站"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "神仙树"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "高朋大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "太平园"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "武侯大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "龙爪堰"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "东坡路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "文化宫"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "金沙博物馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "一品天下"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "茶店子"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "花照壁"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "西南交大"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "九里堤"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "北站西二路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "火车北站"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "驷马桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "府青路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "八里庄"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "二仙桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "理工大学"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "崔家店"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "西河"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "明蜀王陵"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "成都大学"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "十陵"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "来龙"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "槐树店"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "万年场"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "双桥路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "玉双路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "市二医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "太升南路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "骡马市"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "宽窄巷子"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "中医大省医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "草堂北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "西南财大"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "文化宫"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "清江西路"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "成都西站"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "中坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "蔡桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "非遗博览园"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "马厂坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "凤凰大街"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "涌泉"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "光华公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "南熏大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "凤溪河"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "杨柳河"
			},
			{
				cityName: "成都市",
				lineName: "地铁4号线(西河-万盛)",
				stepName: "万盛"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "五根松"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "广都"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "四河"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "华府大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "天府五街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "天府三街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "世纪城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "锦城广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "孵化园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "金融城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "高新"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "火车南站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "桐梓林"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "倪家桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "省体育馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "华西坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "锦江宾馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "天府广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "骡马市"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "文殊院"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "人民北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "火车北站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "升仙湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(五根松-韦家碾)",
				stepName: "韦家碾"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "太平园"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "红牌楼"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "高升桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "衣冠庙"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "省体育馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "磨子桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "新南门"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "春熙路"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "市二医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "红星桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "前锋路"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "李家沱"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "驷马桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "昭觉寺南路"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "动物园"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "熊猫大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(太平园-军区总医院)",
				stepName: "军区总医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "军区总医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "熊猫大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "动物园"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "昭觉寺南路"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "驷马桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "李家沱"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "前锋路"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "红星桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "市二医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "春熙路"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "新南门"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "磨子桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "省体育馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "衣冠庙"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "高升桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "红牌楼"
			},
			{
				cityName: "成都市",
				lineName: "地铁3号线(军区总医院-太平园)",
				stepName: "太平园"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "犀浦"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "天河路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "百草路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "金周路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "金科北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "迎宾大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "茶店子客运站"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "羊犀立交"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "一品天下"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "蜀汉路东"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "白果林"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "中医大省医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "通惠门"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "人民公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "天府广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "春熙路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "东门大桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "牛王庙"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "牛市口"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "东大路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "塔子山公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "成都东客站"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "成渝立交"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "惠王陵"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "洪河"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "成都行政学院"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "大面铺"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "连山坡"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "界牌"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "书房"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "龙平路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(犀浦-龙泉驿)",
				stepName: "龙泉驿"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "科学城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "兴隆湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "广州路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "西博城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "天府公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "武汉路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "麓湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "红石公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "广福"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "海昌路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "华阳"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "四河"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "华府大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "天府五街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "天府三街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "世纪城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "锦城广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "孵化园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "金融城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "高新"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "火车南站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "桐梓林"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "倪家桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "省体育馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "华西坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "锦江宾馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "天府广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "骡马市"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "文殊院"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "人民北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "火车北站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "升仙湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(科学城-韦家碾)",
				stepName: "韦家碾"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "龙泉驿"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "龙平路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "书房"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "界牌"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "连山坡"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "大面铺"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "成都行政学院"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "洪河"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "惠王陵"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "成渝立交"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "成都东客站"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "塔子山公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "东大路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "牛市口"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "牛王庙"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "东门大桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "春熙路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "天府广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "人民公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "通惠门"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "中医大省医院"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "白果林"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "蜀汉路东"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "一品天下"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "羊犀立交"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "茶店子客运站"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "迎宾大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "金科北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "金周路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "百草路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "天河路"
			},
			{
				cityName: "成都市",
				lineName: "地铁2号线(龙泉驿-犀浦)",
				stepName: "犀浦"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "韦家碾"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "升仙湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "火车北站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "人民北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "文殊院"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "骡马市"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "天府广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "锦江宾馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "华西坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "省体育馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "倪家桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "桐梓林"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "火车南站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "高新"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "金融城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "孵化园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "锦城广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "世纪城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "天府三街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "天府五街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "华府大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "四河"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "华阳"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "海昌路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "广福"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "红石公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "麓湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "武汉路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "天府公园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "西博城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "广州路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "兴隆湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-科学城)",
				stepName: "科学城"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "崔家店"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "理工大学"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "二仙桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "八里庄"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "府青路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "驷马桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "火车北站"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "北站西二路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "九里堤"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "西南交大"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "花照壁"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "茶店子"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "一品天下"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "金沙博物馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "文化宫"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "东坡路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "龙爪堰"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "武侯大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "太平园"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "高朋大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "神仙树"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "火车南站"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "三瓦窑"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "琉璃场"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "四川师大"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "狮子山"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "大观"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "成都东客站"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "迎晖路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "槐树店"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "双店路"
			},
			{
				cityName: "成都市",
				lineName: "地铁7号线",
				stepName: "崔家店"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(太平园-双流机场2航站楼)",
				stepName: "太平园"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(太平园-双流机场2航站楼)",
				stepName: "簇锦"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(太平园-双流机场2航站楼)",
				stepName: "华兴"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(太平园-双流机场2航站楼)",
				stepName: "金花"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(太平园-双流机场2航站楼)",
				stepName: "双流机场1航站楼"
			},
			{
				cityName: "成都市",
				lineName: "地铁10号线(太平园-双流机场2航站楼)",
				stepName: "双流机场2航站楼"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "韦家碾"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "升仙湖"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "火车北站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "人民北路"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "文殊院"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "骡马市"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "天府广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "锦江宾馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "华西坝"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "省体育馆"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "倪家桥"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "桐梓林"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "火车南站"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "高新"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "金融城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "孵化园"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "锦城广场"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "世纪城"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "天府三街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "天府五街"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "华府大道"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "四河"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "广都"
			},
			{
				cityName: "成都市",
				lineName: "地铁1号线(韦家碾-五根松)",
				stepName: "五根松"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "黎明广场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "滂江街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "东中街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "中街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "怀远门"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "青年大街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "南市场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "太原街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "沈阳站"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "云峰北街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "铁西广场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "保工街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "启工街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "重工街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "迎宾路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "于洪广场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "开发大道"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "张士"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "四号街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "七号街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "中央大街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(黎明广场-十三号街)",
				stepName: "十三号街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "全运路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "白塔河路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "世纪大厦"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "营盘街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "奥体中心"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "五里河"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "市图书馆"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "工业展览馆"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "青年公园"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "青年大街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "市府广场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "金融中心"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "沈阳北站"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "岐山路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "中医药大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "北陵公园"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "新乐遗址"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "陵西"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "三台子"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "医学院"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "师范大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "航空航天大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "辽宁大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "人杰湖公园"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "蒲河路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(全运路-蒲田路)",
				stepName: "蒲田路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "蒲田路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "蒲河路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "人杰湖公园"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "辽宁大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "航空航天大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "师范大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "医学院"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "三台子"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "陵西"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "新乐遗址"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "北陵公园"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "中医药大学"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "岐山路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "沈阳北站"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "金融中心"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "市府广场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "青年大街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "青年公园"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "工业展览馆"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "市图书馆"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "五里河"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "奥体中心"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "营盘街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "世纪大厦"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "白塔河路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁2号线(蒲田路-全运路)",
				stepName: "全运路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "十三号街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "中央大街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "七号街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "四号街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "张士"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "开发大道"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "于洪广场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "迎宾路"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "重工街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "启工街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "保工街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "铁西广场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "云峰北街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "沈阳站"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "太原街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "南市场"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "青年大街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "怀远门"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "中街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "东中街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "滂江街"
			},
			{
				cityName: "沈阳市",
				lineName: "地铁1号线(十三号街-黎明广场)",
				stepName: "黎明广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "浦沿"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "杨家墩"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "中医药大学"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "联庄"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "水澄桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "复兴路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "南星桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "甬江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "近江"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "城星路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "市民中心"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "江锦路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "钱江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "景芳"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "新塘"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "新风"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "火车东站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(浦沿-彭埠)",
				stepName: "彭埠"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "彭埠"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "火车东站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "新风"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "新塘"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "景芳"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "钱江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "江锦路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "市民中心"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "城星路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "近江"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "甬江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "南星桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "复兴路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "水澄桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "联庄"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "中医药大学"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "杨家墩"
			},
			{
				cityName: "杭州市",
				lineName: "地铁4号线(彭埠-浦沿)",
				stepName: "浦沿"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "朝阳"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "曹家桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "潘水"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "人民路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "杭发厂"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "人民广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "建设一路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "建设三路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "振宁路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "飞虹路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "盈丰路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "钱江世纪城"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "钱江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "庆春广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "庆菱路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "建国北路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "中河北路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "凤起路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "武林门"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "沈塘桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "学院路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "古翠路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "丰潭路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "文新"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "三坝"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "虾龙圩"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "三墩"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "墩祥街"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "金家渡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "白洋"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "杜甫村"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(朝阳-良渚)",
				stepName: "良渚"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "良渚"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "杜甫村"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "白洋"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "金家渡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "墩祥街"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "三墩"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "虾龙圩"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "三坝"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "文新"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "丰潭路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "古翠路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "学院路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "沈塘桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "武林门"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "凤起路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "中河北路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "建国北路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "庆菱路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "庆春广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "钱江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "钱江世纪城"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "盈丰路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "飞虹路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "振宁路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "建设三路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "建设一路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "人民广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "杭发厂"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "人民路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "潘水"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "曹家桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁2号线(良渚-朝阳)",
				stepName: "朝阳"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "湘湖"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "滨康路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "西兴"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "滨和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "江陵路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "近江"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "婺江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "城站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "定安路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "龙翔桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "凤起路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "武林广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "西湖文化广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "打铁关"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "闸弄口"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "火车东站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "彭埠"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "七堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "九和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "九堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "客运中心"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "乔司南"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "乔司"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "翁梅"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "余杭高铁站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "南苑"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-临平)",
				stepName: "临平"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "临平"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "南苑"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "余杭高铁站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "翁梅"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "乔司"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "乔司南"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "客运中心"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "九堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "九和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "七堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "彭埠"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "火车东站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "闸弄口"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "打铁关"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "西湖文化广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "武林广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "凤起路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "龙翔桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "定安路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "城站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "婺江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "近江"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "江陵路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "滨和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "西兴"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "滨康路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(临平-湘湖)",
				stepName: "湘湖"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "下沙江滨"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "云水"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "文海南路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "文泽路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "高沙路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "金沙湖"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "下沙西"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "客运中心"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "九堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "九和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "七堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "彭埠"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "火车东站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "闸弄口"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "打铁关"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "西湖文化广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "武林广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "凤起路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "龙翔桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "定安路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "城站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "婺江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "近江"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "江陵路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "滨和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "西兴"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "滨康路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(下沙江滨-湘湖)",
				stepName: "湘湖"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "湘湖"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "滨康路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "西兴"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "滨和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "江陵路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "近江"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "婺江路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "城站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "定安路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "龙翔桥"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "凤起路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "武林广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "西湖文化广场"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "打铁关"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "闸弄口"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "火车东站"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "彭埠"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "七堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "九和路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "九堡"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "客运中心"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "下沙西"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "金沙湖"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "高沙路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "文泽路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "文海南路"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "云水"
			},
			{
				cityName: "杭州市",
				lineName: "地铁1号线(湘湖-下沙江滨)",
				stepName: "下沙江滨"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "金台"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "施岗"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "阳逻开发区"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "阳逻"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "武生院"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "军民村"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "沙口"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "武湖"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "高车"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "青龙"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "谌家矶"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "朱家河"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "幸福湾"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "新荣客运站"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "百步亭花园路"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(金台-后湖大道)",
				stepName: "后湖大道"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "后湖大道"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "百步亭花园路"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "新荣客运站"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "幸福湾"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "朱家河"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "谌家矶"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "青龙"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "高车"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "武湖"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "沙口"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "军民村"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "武生院"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "阳逻"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "阳逻开发区"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "施岗"
			},
			{
				cityName: "武汉市",
				lineName: "阳逻线(后湖大道-金台)",
				stepName: "金台"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "天河机场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "航空总部"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "宋家岗"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "巨龙大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "盘龙城"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "宏图大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "常青城"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "金银潭"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "常青花园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "长港路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "汉口火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "范湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "王家墩东"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "青年路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "中山公园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "循礼门"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "江汉路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "积玉桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "螃蟹岬"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "小龟山"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "洪山广场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "中南路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "宝通寺"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "街道口"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "广埠屯"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "虎泉"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "杨家湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(天河机场-光谷广场)",
				stepName: "光谷广场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "光谷广场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "杨家湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "虎泉"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "广埠屯"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "街道口"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "宝通寺"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "中南路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "洪山广场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "小龟山"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "螃蟹岬"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "积玉桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "江汉路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "循礼门"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "中山公园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "青年路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "王家墩东"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "范湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "汉口火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "长港路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "常青花园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "金银潭"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "常青城"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "宏图大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "盘龙城"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "巨龙大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "宋家岗"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "航空总部"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通2号线(光谷广场-天河机场)",
				stepName: "天河机场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "东风公司"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "车城东路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "江城大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "老关村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "国博中心南"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "国博中心北"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "前进村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "建港"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "马鹦路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "钟家村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "琴台"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "武胜路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "汉正街"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "六渡桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "江汉路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "大智路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "苗栗路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "香港路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "三眼桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "唐家墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "石桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "杨汊湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "常青花园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "轻工大学"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "园博园北"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "金银湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(东风公司-金银湖公园)",
				stepName: "金银湖公园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "梨园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "岳家嘴"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "汪家墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "徐东"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "徐家棚"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "黄浦路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "赵家条"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "竹叶山"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "中一路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "塔子湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "宏图大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(梨园-金潭路)",
				stepName: "金潭路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "汉口北"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "滠口新城"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "滕子岗"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "堤角"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "新荣"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "丹水池"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "徐州新村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "二七路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "头道街"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "黄浦路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "三阳路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "大智路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "循礼门"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "友谊路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "利济北路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "崇仁路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "硚口路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "太平洋"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "宗关"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "汉西一路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "古田四路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "古田三路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "古田二路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "古田一路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "舵落口"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "竹叶海"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "额头湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "五环大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "东吴大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "码头潭公园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "三店"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(汉口北-径河)",
				stepName: "径河"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "黄金口"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "孟家铺"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "永安堂"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "玉龙路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "王家湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "十里铺"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "七里庙"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "五里墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "汉阳火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "钟家村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "拦江路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "复兴路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "首义路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "武昌火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "梅苑小区"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "中南路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "洪山广场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "楚河汉街"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "青鱼嘴"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "东亭"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "岳家嘴"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "铁机路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "罗家港"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "园林路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "仁和路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "工业四路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "杨春湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(黄金口-武汉火车站)",
				stepName: "武汉火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "武汉火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "杨春湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "工业四路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "仁和路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "园林路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "罗家港"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "铁机路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "岳家嘴"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "东亭"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "青鱼嘴"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "楚河汉街"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "洪山广场"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "中南路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "梅苑小区"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "武昌火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "首义路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "复兴路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "拦江路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "钟家村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "汉阳火车站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "五里墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "七里庙"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "十里铺"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "王家湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "玉龙路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "永安堂"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "孟家铺"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通4号线(武汉火车站-黄金口)",
				stepName: "黄金口"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "径河"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "三店"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "码头潭公园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "东吴大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "五环大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "额头湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "竹叶海"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "舵落口"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "古田一路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "古田二路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "古田三路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "古田四路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "汉西一路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "宗关"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "太平洋"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "硚口路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "崇仁路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "利济北路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "友谊路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "循礼门"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "大智路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "三阳路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "黄浦路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "头道街"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "二七路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "徐州新村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "丹水池"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "新荣"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "堤角"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "滕子岗"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "滠口新城"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通1号线(径河-汉口北)",
				stepName: "汉口北"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "宏图大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "市民之家"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "后湖大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "兴业路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "二七小路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "罗家庄"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "赵家条"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "惠济二路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "香港路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "菱角湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "范湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "云飞路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "武汉商务区"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "双墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "宗关"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "王家湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "龙阳村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "陶家岭"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "四新大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "汉阳客运站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "三角湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "体育中心"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "东风公司"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(宏图大道-沌阳大道)",
				stepName: "沌阳大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "金银湖公园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "金银湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "园博园北"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "轻工大学"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "常青花园"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "杨汊湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "石桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "唐家墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "三眼桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "香港路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "苗栗路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "大智路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "江汉路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "六渡桥"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "汉正街"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "武胜路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "琴台"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "钟家村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "马鹦路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "建港"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "前进村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "国博中心北"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "国博中心南"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "老关村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "江城大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "车城东路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通6号线(金银湖公园-东风公司)",
				stepName: "东风公司"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "沌阳大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "东风公司"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "体育中心"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "三角湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "汉阳客运站"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "四新大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "陶家岭"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "龙阳村"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "王家湾"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "宗关"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "双墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "武汉商务区"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "云飞路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "范湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "菱角湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "香港路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "惠济二路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "赵家条"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "罗家庄"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "二七小路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "兴业路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "后湖大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "市民之家"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通3号线(沌阳大道-宏图大道)",
				stepName: "宏图大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "金潭路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "宏图大道"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "塔子湖"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "中一路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "竹叶山"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "赵家条"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "黄浦路"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "徐家棚"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "徐东"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "汪家墩"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "岳家嘴"
			},
			{
				cityName: "武汉市",
				lineName: "轨道交通8号线(金潭路-梨园)",
				stepName: "梨园"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "开福区政府"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "马厂"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "北辰三角洲"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "开福寺"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "文昌阁"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "培元桥"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "五一广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "黄兴广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "南门口"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "侯家塘"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "南湖路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "黄土岭"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "涂家冲"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "铁道学院"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "友谊路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "省政府"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "桂花坪"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "大托"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "中信广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(开福区政府-尚双塘)",
				stepName: "尚双塘"
			},
			{
				cityName: "长沙市",
				lineName: "磁浮快线(磁浮机场站-磁浮高铁站)",
				stepName: "磁浮机场站"
			},
			{
				cityName: "长沙市",
				lineName: "磁浮快线(磁浮机场站-磁浮高铁站)",
				stepName: "磁浮榔梨"
			},
			{
				cityName: "长沙市",
				lineName: "磁浮快线(磁浮机场站-磁浮高铁站)",
				stepName: "磁浮高铁站"
			},
			{
				cityName: "长沙市",
				lineName: "磁浮快线(磁浮高铁站-磁浮机场站)",
				stepName: "磁浮高铁站"
			},
			{
				cityName: "长沙市",
				lineName: "磁浮快线(磁浮高铁站-磁浮机场站)",
				stepName: "磁浮榔梨"
			},
			{
				cityName: "长沙市",
				lineName: "磁浮快线(磁浮高铁站-磁浮机场站)",
				stepName: "磁浮机场站"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "梅溪湖西"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "麓云路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "文化艺术中心"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "梅溪湖东"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "望城坡"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "金星路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "西湖公园"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "溁湾镇"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "橘子洲"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "湘江中路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "五一广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "芙蓉广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "迎宾路口"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "袁家岭"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "长沙火车站"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "锦泰广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "万家丽广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "人民东路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "长沙大道"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "沙湾公园"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "杜花路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "长沙火车南站"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(梅溪湖西-光达)",
				stepName: "光达"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "光达"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "长沙火车南站"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "杜花路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "沙湾公园"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "长沙大道"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "人民东路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "万家丽广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "锦泰广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "长沙火车站"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "袁家岭"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "迎宾路口"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "芙蓉广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "五一广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "湘江中路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "橘子洲"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "溁湾镇"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "西湖公园"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "金星路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "望城坡"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "梅溪湖东"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "文化艺术中心"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "麓云路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁2号线(光达-梅溪湖西)",
				stepName: "梅溪湖西"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "尚双塘"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "中信广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "大托"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "桂花坪"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "省政府"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "友谊路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "铁道学院"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "涂家冲"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "黄土岭"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "南湖路"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "侯家塘"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "南门口"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "黄兴广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "五一广场"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "培元桥"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "文昌阁"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "开福寺"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "北辰三角洲"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "马厂"
			},
			{
				cityName: "长沙市",
				lineName: "地铁1号线(尚双塘-开福区政府)",
				stepName: "开福区政府"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "木里"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "苏州湾北"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "天鹅荡路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "文溪路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "越溪"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "石湖莫舍"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "蠡墅"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(木里-红庄)",
				stepName: "红庄"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "同里"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "庞金路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "吴江汽车站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "吴江人民广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "松陵大道"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "苏州湾东"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "顾家荡"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "笠泽路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "流虹路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "江兴西路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "江陵西路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "花港"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "清树湾"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "红庄"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "石湖东路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "宝带路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "团结桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "人民桥南"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "南门"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "三元坊"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "乐桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "察院场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "北寺塔"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "苏州火车站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "苏锦"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "平泷路西"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "孙武纪念园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "活力岛"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "姚祥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "张庄"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(同里-龙道浜)",
				stepName: "龙道浜"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "红庄"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "蠡墅"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "石湖莫舍"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "越溪"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "文溪路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "天鹅荡路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "苏州湾北"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线支线(红庄-木里)",
				stepName: "木里"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "花桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "光明路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "兆丰路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "安亭"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海汽车城"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "昌吉东路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海赛车场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "嘉定新城"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "马陆"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "南翔"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "桃浦新村"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "武威路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "祁连山路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "李子园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海西站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "真如"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "枫桥路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "曹杨路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "隆德路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "江苏路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "交通大学"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "徐家汇"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "上海游泳馆"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "龙华"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "云锦路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "龙耀路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "东方体育中心"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "三林"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "三林东"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "浦三路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "御桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "罗山路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "秀沿路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "康新公路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(花桥-迪士尼)",
				stepName: "迪士尼"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "桑田岛"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "金尚路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "金谷路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "松涛街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "月亮湾"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "独墅湖邻里中心"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "独墅湖南"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "尹山湖"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "郭苑路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "郭巷"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "尹中路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "宝带桥南"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "石湖东路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "新家桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "盘蠡路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "友联"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "桐泾公园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "胥江路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "劳动路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "三香广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "广济南路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "石路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "山塘街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "苏州火车站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "平河路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "平泷路东"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "陆慕"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "阳澄湖中路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "徐图港"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "蠡口"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "富元路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "大湾"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "高铁苏州北站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "富翔路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(桑田岛-骑河)",
				stepName: "骑河"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "骑河"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "富翔路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "高铁苏州北站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "大湾"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "富元路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "蠡口"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "徐图港"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "阳澄湖中路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "陆慕"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "平泷路东"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "平河路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "苏州火车站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "山塘街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "石路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "广济南路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "三香广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "劳动路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "胥江路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "桐泾公园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "友联"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "盘蠡路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "新家桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "石湖东路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "宝带桥南"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "尹中路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "郭巷"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "郭苑路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "尹山湖"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "独墅湖南"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "独墅湖邻里中心"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "月亮湾"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "松涛街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "金谷路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "金尚路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁2号线(骑河-桑田岛)",
				stepName: "桑田岛"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "迪士尼"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "康新公路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "秀沿路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "罗山路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "御桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "浦三路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "三林东"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "三林"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "东方体育中心"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "龙耀路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "云锦路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "龙华"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海游泳馆"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "徐家汇"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "交通大学"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "江苏路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "隆德路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "曹杨路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "枫桥路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "真如"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海西站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "李子园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "祁连山路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "武威路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "桃浦新村"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "南翔"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "马陆"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "嘉定新城"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海赛车场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "昌吉东路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "上海汽车城"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "安亭"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "兆丰路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "光明路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁11号线(迪士尼-花桥)",
				stepName: "花桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "龙道浜"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "张庄"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "姚祥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "活力岛"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "孙武纪念园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "平泷路西"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "苏锦"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "苏州火车站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "北寺塔"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "察院场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "乐桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "三元坊"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "南门"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "人民桥南"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "团结桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "宝带路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "石湖东路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "红庄"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "清树湾"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "花港"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "江陵西路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "江兴西路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "流虹路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "笠泽路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "顾家荡"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "苏州湾东"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "松陵大道"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "吴江人民广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "吴江汽车站"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "庞金路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁4号线(龙道浜-同里)",
				stepName: "同里"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "木渎"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "金枫路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "汾湖路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "玉山路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "苏州乐园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "塔园路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "滨河路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "西环路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "桐泾北路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "广济南路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "养育巷"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "乐桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "临顿路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "相门"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "东环路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "中央公园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "星海广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "东方之门"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "文化博览中心"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "时代广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "星湖街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "南施街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "星塘街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(木渎-钟南街)",
				stepName: "钟南街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "钟南街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "星塘街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "南施街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "星湖街"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "时代广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "文化博览中心"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "东方之门"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "星海广场"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "中央公园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "东环路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "相门"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "临顿路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "乐桥"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "养育巷"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "广济南路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "桐泾北路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "西环路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "滨河路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "塔园路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "苏州乐园"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "玉山路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "汾湖路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "金枫路"
			},
			{
				cityName: "苏州市",
				lineName: "地铁1号线(钟南街-木渎)",
				stepName: "木渎"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "海之韵"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "东海"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "东港"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "会议中心"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "港湾广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "中山广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "友好广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "青泥洼桥"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "一二九街"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "人民广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "联合路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "西安路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "交通大学"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "辽师大"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "马栏广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "湾家"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "红旗西路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "虹锦路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "虹港路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "机场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(海之韵-辛寨子)",
				stepName: "辛寨子"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "河口"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "蔡大岭"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "黄泥川"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "龙王塘"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "塔河湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "旅顺"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "铁山"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(河口-旅顺新港)",
				stepName: "旅顺新港"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "河口"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "七贤岭"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "海事大学"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "学苑广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "黑石礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "大医二院"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "星海广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "会展中心"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "富国街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "西安路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "兴工街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "中长街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "香工街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "春柳"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "东纬路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "松江路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "千山路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "华南广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "华南北"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "华北路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "大连北站"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(河口-姚家)",
				stepName: "姚家"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "旅顺新港"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "铁山"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "旅顺"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "塔河湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "龙王塘"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "黄泥川"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "蔡大岭"
			},
			{
				cityName: "大连市",
				lineName: "地铁12号线(旅顺新港-河口)",
				stepName: "河口"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "姚家"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "大连北站"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "华北路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "华南北"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "华南广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "千山路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "松江路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "东纬路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "春柳"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "香工街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "中长街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "兴工街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "西安路"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "富国街"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "会展中心"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "星海广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "大医二院"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "黑石礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "学苑广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "海事大学"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "七贤岭"
			},
			{
				cityName: "大连市",
				lineName: "地铁1号线(姚家-河口)",
				stepName: "河口"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "辛寨子"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "机场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "虹港路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "虹锦路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "红旗西路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "湾家"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "马栏广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "辽师大"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "交通大学"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "西安路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "联合路"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "人民广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "一二九街"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "青泥洼桥"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "友好广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "中山广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "港湾广场"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "会议中心"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "东港"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "东海"
			},
			{
				cityName: "大连市",
				lineName: "地铁2号线(辛寨子-海之韵)",
				stepName: "海之韵"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(开发区-九里)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(开发区-九里)",
				stepName: "通世泰"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(开发区-九里)",
				stepName: "鸿玮澜山"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(开发区-九里)",
				stepName: "东山路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(开发区-九里)",
				stepName: "和平路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(开发区-九里)",
				stepName: "十九局"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(开发区-九里)",
				stepName: "九里"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "金石滩"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "小窑湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "双d港"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "保税区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "金马路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "大连湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "后盐"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "泉水"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "金家街"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "香炉礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(金石滩-大连火车站)",
				stepName: "大连火车站"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "大连火车站"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "香炉礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "金家街"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "泉水"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "后盐"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "大连湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "金马路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(大连火车站-保税区)",
				stepName: "保税区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "九里"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "十九局"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "和平路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "东山路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "鸿玮澜山"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "通世泰"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "金马路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "大连湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "后盐"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "泉水"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "金家街"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "香炉礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(九里-大连火车站)",
				stepName: "大连火车站"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "保税区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "金马路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "大连湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "后盐"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "泉水"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "金家街"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "香炉礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线保税区线(保税区-大连火车站)",
				stepName: "大连火车站"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "大连火车站"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "香炉礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "金家街"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "泉水"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "后盐"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "大连湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "金马路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "通世泰"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "鸿玮澜山"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "东山路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "和平路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "十九局"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里线(大连火车站-九里)",
				stepName: "九里"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(九里-开发区)",
				stepName: "九里"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(九里-开发区)",
				stepName: "十九局"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(九里-开发区)",
				stepName: "和平路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(九里-开发区)",
				stepName: "东山路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(九里-开发区)",
				stepName: "鸿玮澜山"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(九里-开发区)",
				stepName: "通世泰"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线九里支线(九里-开发区)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "大连火车站"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "香炉礁"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "金家街"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "泉水"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "后盐"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "大连湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "金马路"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "开发区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "保税区"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "双d港"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "小窑湾"
			},
			{
				cityName: "大连市",
				lineName: "地铁3号线(大连火车站-金石滩)",
				stepName: "金石滩"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "红嘴子"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "华庆路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "市政府"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "卫星广场"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "繁荣路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "工农广场"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "东北师大"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "解放大路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "人民广场"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "胜利公园"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "长春站北"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "一匡街"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "庆丰路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(红嘴子-北环城路)",
				stepName: "北环城路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "北环城路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "庆丰路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "一匡街"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "长春站北"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "胜利公园"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "人民广场"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "解放大路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "东北师大"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "工农广场"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "繁荣路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "卫星广场"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "市政府"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "华庆路"
			},
			{
				cityName: "长春市",
				lineName: "地铁1号线(北环城路-红嘴子)",
				stepName: "红嘴子"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "长春站"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "辽宁路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "西安桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "南昌路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "朝阳桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "解放桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "湖西桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "宽平桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "抚松路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "南湖大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "湖光路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "硅谷大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "前进"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "前进大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "卫明街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "卫光街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "卫星广场"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "亚泰大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "伊通河"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "临河街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "仙台大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "会展中心"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "世纪广场"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "中医药大学"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "东北师大"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "华桥外院博学路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "农博园"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "净月公园"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "紫杉路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "福祉路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "滑雪场"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长春站-长影世纪城)",
				stepName: "长影世纪城"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "车场"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "南四环"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "南三环"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "世荣路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "卫星路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "北海路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "东南湖大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "浦东路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "自由大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "公平路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "吉林大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "东大桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "伪皇宫"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "北亚泰大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(车场-长春站北)",
				stepName: "长春站北"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "长影世纪城"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "滑雪场"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "福祉路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "紫杉路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "净月公园"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "农博园"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "华桥外院博学路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "东北师大"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "中医药大学"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "世纪广场"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "会展中心"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "仙台大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "临河街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "伊通河"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "亚泰大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "卫星广场"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "卫光街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "卫明街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "前进大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "前进"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "硅谷大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "湖光路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "南湖大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "抚松路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "宽平桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "湖西桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "解放桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "朝阳桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "南昌路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "西安桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "辽宁路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨3号线(长影世纪城-长春站)",
				stepName: "长春站"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "长春站北"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "北亚泰大街"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "伪皇宫"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "东大桥"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "吉林大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "公平路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "自由大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "浦东路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "东南湖大路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "北海路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "卫星路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "世荣路"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "南三环"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "南四环"
			},
			{
				cityName: "长春市",
				lineName: "轻轨4号线(长春站北-车场)",
				stepName: "车场"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "鱼化寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "丈八北路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "延平门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "科技路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "太白南路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "吉祥村"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "小寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "大雁塔"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "北池头"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "青龙寺"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "延兴门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "咸宁路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "长乐公园"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "通化门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "胡家庙"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "石家街"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "辛家庙"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "广泰门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "桃花潭"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "浐灞中心"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "香湖湾"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "务庄"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "国际港务区"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "双寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "新筑"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(鱼化寨-保税区)",
				stepName: "保税区"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "后卫寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "三桥"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "皂河"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "枣园"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "汉城路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "开远门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "劳动路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "玉祥门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "洒金桥"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "北大街"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "五路口"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "朝阳门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "康复路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "通化门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "万寿路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "长乐坡"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "浐河"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "半坡"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(后卫寨-纺织城)",
				stepName: "纺织城"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "纺织城"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "半坡"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "浐河"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "长乐坡"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "万寿路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "通化门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "康复路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "朝阳门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "五路口"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "北大街"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "洒金桥"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "玉祥门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "劳动路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "开远门"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "汉城路"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "枣园"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "皂河"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "三桥"
			},
			{
				cityName: "西安市",
				lineName: "地铁1号线(纺织城-后卫寨)",
				stepName: "后卫寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "保税区"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "新筑"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "双寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "国际港务区"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "务庄"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "香湖湾"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "浐灞中心"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "桃花潭"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "广泰门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "辛家庙"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "石家街"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "胡家庙"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "通化门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "长乐公园"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "咸宁路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "延兴门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "青龙寺"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "北池头"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "大雁塔"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "小寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "吉祥村"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "太白南路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "科技路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "延平门"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "丈八北路"
			},
			{
				cityName: "西安市",
				lineName: "地铁3号线(保税区-鱼化寨)",
				stepName: "鱼化寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "北客站"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "北苑"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "运动公园"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "行政中心"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "凤城五路"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "市图书馆"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "大明宫西"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "龙首原"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "安远门"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "北大街"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "钟楼"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "永宁门"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "南稍门"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "体育场"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "小寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "纬一街"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "会展中心"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "三爻"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "凤栖原"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "航天城"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(北客站-韦曲南)",
				stepName: "韦曲南"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "韦曲南"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "航天城"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "凤栖原"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "三爻"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "会展中心"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "纬一街"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "小寨"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "体育场"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "南稍门"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "永宁门"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "钟楼"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "北大街"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "安远门"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "龙首原"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "大明宫西"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "市图书馆"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "凤城五路"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "行政中心"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "运动公园"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "北苑"
			},
			{
				cityName: "西安市",
				lineName: "地铁2号线(韦曲南-北客站)",
				stepName: "北客站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(昆明南火车站-春融街)",
				stepName: "昆明南火车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(昆明南火车站-春融街)",
				stepName: "白龙潭"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(昆明南火车站-春融街)",
				stepName: "宜和路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(昆明南火车站-春融街)",
				stepName: "市级行政中心清风"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(昆明南火车站-春融街)",
				stepName: "春融街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "东部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "虹桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "太平村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "金马寺"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "大树营"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "拓东体育馆"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "东风广场"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "五一路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "潘家湾"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "市体育馆"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "梁家河"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "西苑"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "昌源中路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "眠山"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "西部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "大渔路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "石咀"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "普坪村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "车家壁"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(东部汽车站-西山公园)",
				stepName: "西山公园"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "环城南路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "昆明火车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "福德"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "日新路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "巫家坝"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "昌宏西路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "晓东村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "珥季路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "星耀路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "新亚洲体育城"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "南部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "斗南"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "春融街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "驼峰街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "联大街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "谊康南路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "大学城"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(环城南路-大学城南)",
				stepName: "大学城南"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "环城南路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "塘子巷"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "东风广场"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "交三桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "穿心鼓楼"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "火车北站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "白云路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "金星"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "北辰"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "霖雨桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "羊肠村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "司家营"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "龙头街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(环城南路-北部汽车站)",
				stepName: "北部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "大学城南"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "大学城"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "谊康南路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "联大街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "驼峰街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "春融街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "斗南"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "南部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "新亚洲体育城"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "星耀路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "珥季路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "晓东村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "昌宏西路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "巫家坝"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "日新路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "福德"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "昆明火车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线(大学城南-环城南路)",
				stepName: "环城南路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "北部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "龙头街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "司家营"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "羊肠村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "霖雨桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "北辰"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "金星"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "白云路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "火车北站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "穿心鼓楼"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "交三桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "东风广场"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "塘子巷"
			},
			{
				cityName: "昆明市",
				lineName: "地铁2号线(北部汽车站-环城南路)",
				stepName: "环城南路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(春融街-昆明南火车站)",
				stepName: "春融街"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(春融街-昆明南火车站)",
				stepName: "市级行政中心清风"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(春融街-昆明南火车站)",
				stepName: "宜和路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(春融街-昆明南火车站)",
				stepName: "白龙潭"
			},
			{
				cityName: "昆明市",
				lineName: "地铁1号线支线(春融街-昆明南火车站)",
				stepName: "昆明南火车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "西山公园"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "车家壁"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "普坪村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "石咀"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "大渔路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "西部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "眠山"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "昌源中路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "西苑"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "梁家河"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "市体育馆"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "潘家湾"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "五一路"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "东风广场"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "拓东体育馆"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "大树营"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "金马寺"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "太平村"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "虹桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁3号线(西山公园-东部汽车站)",
				stepName: "东部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(机场中心-东部汽车站)",
				stepName: "机场中心"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(机场中心-东部汽车站)",
				stepName: "机场前"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(机场中心-东部汽车站)",
				stepName: "大板桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(机场中心-东部汽车站)",
				stepName: "东部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(东部汽车站-机场中心)",
				stepName: "东部汽车站"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(东部汽车站-机场中心)",
				stepName: "大板桥"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(东部汽车站-机场中心)",
				stepName: "机场前"
			},
			{
				cityName: "昆明市",
				lineName: "地铁6号线(东部汽车站-机场中心)",
				stepName: "机场中心"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "燕岗"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "沙园"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "沙涌"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "鹤洞"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "西朗"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "菊树"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "龙溪"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "金融高新区"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "千灯湖"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "礌岗"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "南桂路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "桂城"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "朝安"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "普君北路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "祖庙"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "同济路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "季华园"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "魁奇路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "澜石"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "世纪莲"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "东平"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(燕岗-新城东)",
				stepName: "新城东"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "新城东"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "东平"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "世纪莲"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "澜石"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "魁奇路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "季华园"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "同济路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "祖庙"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "普君北路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "朝安"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "桂城"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "南桂路"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "礌岗"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "千灯湖"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "金融高新区"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "龙溪"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "菊树"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "西朗"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "鹤洞"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "沙涌"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "沙园"
			},
			{
				cityName: "佛山市",
				lineName: "广佛线(新城东-燕岗)",
				stepName: "燕岗"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "哈东站"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "桦树街"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "交通学院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "太平桥"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "工程大学"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "烟厂"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "医大一院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "博物馆"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "铁路局"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "哈工大"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "西大桥"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "和兴路"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "学府路"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "理工大学"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "黑龙江大学"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "医大二院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "哈达"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈东站-哈南站)",
				stepName: "哈南站"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "哈南站"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "哈达"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "医大二院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "黑龙江大学"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "理工大学"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "学府路"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "和兴路"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "西大桥"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "哈工大"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "铁路局"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "博物馆"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "医大一院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "烟厂"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "工程大学"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "太平桥"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "交通学院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "桦树街"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁1号线(哈南站-哈东站)",
				stepName: "哈东站"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(哈尔滨西站-医大二院)",
				stepName: "哈尔滨西站"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(哈尔滨西站-医大二院)",
				stepName: "哈尔滨大街"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(哈尔滨西站-医大二院)",
				stepName: "哈西大街"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(哈尔滨西站-医大二院)",
				stepName: "医大二院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(医大二院-哈尔滨西站)",
				stepName: "医大二院"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(医大二院-哈尔滨西站)",
				stepName: "哈西大街"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(医大二院-哈尔滨西站)",
				stepName: "哈尔滨大街"
			},
			{
				cityName: "哈尔滨市",
				lineName: "地铁3号线(医大二院-哈尔滨西站)",
				stepName: "哈尔滨西站"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "南四环"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "十八里河"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "沙窝李"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "双湖大道"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "小乔"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "华南城西"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "华南城"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "华南城东"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "孟庄"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "港区北"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "康平湖"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "兰河公园"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "恩平湖"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "综合保税区"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(南四环-新郑机场)",
				stepName: "新郑机场"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "刘庄"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "柳林"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "沙门"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "北三环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "东风路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "关虎屯"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "黄河路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "紫荆山"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "东大街"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "陇海东路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "二里岗"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "南五里堡"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "花寨"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "南三环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "站马屯"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(刘庄-南四环)",
				stepName: "南四环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "南四环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "站马屯"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "南三环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "花寨"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "南五里堡"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "二里岗"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "陇海东路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "东大街"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "紫荆山"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "黄河路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "关虎屯"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "东风路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "北三环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "沙门"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "柳林"
			},
			{
				cityName: "郑州市",
				lineName: "地铁2号线(南四环-刘庄)",
				stepName: "刘庄"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "河南工业大学"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "郑大科技园"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "郑州大学"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "梧桐街"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "兰寨"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "铁炉"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "市民中心"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "西流湖"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "西三环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "秦岭路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "五一公园"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "碧沙岗"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "绿城广场"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "医学院"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "郑州火车站"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "二七广场"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "人民路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "紫荆山"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "燕庄"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "民航路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "会展中心"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "黄河南路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "农业南路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "东风南路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "郑州东站"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "博学路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "市体育中心"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "龙子湖"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(河南工业大学-文苑北路)",
				stepName: "文苑北路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "文苑北路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "龙子湖"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "市体育中心"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "博学路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "郑州东站"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "东风南路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "农业南路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "黄河南路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "会展中心"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "民航路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "燕庄"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "紫荆山"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "人民路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "二七广场"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "郑州火车站"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "医学院"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "绿城广场"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "碧沙岗"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "五一公园"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "秦岭路"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "西三环"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "西流湖"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "市民中心"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "铁炉"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "兰寨"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "梧桐街"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "郑州大学"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "郑大科技园"
			},
			{
				cityName: "郑州市",
				lineName: "地铁1号线(文苑北路-河南工业大学)",
				stepName: "河南工业大学"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "新郑机场"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "综合保税区"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "恩平湖"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "兰河公园"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "康平湖"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "港区北"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "孟庄"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "华南城东"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "华南城"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "华南城西"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "小乔"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "双湖大道"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "沙窝李"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "十八里河"
			},
			{
				cityName: "郑州市",
				lineName: "城郊线(新郑机场-南四环)",
				stepName: "南四环"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "霞浦"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "长江路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "中河路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "松花江路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "大碶"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "邬隘"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "宝幢"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "五乡"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "邱隘东"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "东环南路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "盛莫路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "福庆北路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "海晏北路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "世纪大道"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "福明路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "樱花公园"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "舟孟北路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "江厦桥东"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "东门口(天一广场)"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "鼓楼"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "西门口"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "大卿桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "泽民"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "望春桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "徐家漕长乐"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "芦港"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "梁祝"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "高桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(霞浦-高桥西)",
				stepName: "高桥西"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "栎社国际机场"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "栎社"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "鄞州大道"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "石碶"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "轻纺城"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "藕池"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "客运中心"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "丽园南路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "云霞路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "宁波火车站"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "城隍庙"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "鼓楼"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "外滩大桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "正大路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "倪家堰"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "压赛堰"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "大通桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "孔浦"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "路林"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "三官堂"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "宁波大学"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(栎社国际机场-清水浦)",
				stepName: "清水浦"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "高桥西"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "高桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "梁祝"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "芦港"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "徐家漕长乐"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "望春桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "泽民"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "大卿桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "西门口"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "鼓楼"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "东门口(天一广场)"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "江厦桥东"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "舟孟北路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "樱花公园"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "福明路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "世纪大道"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "海晏北路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "福庆北路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "盛莫路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "东环南路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "邱隘东"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "五乡"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "宝幢"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "邬隘"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "大碶"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "松花江路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "中河路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "长江路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁1号线(高桥西-霞浦)",
				stepName: "霞浦"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "清水浦"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "宁波大学"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "三官堂"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "路林"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "孔浦"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "大通桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "压赛堰"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "倪家堰"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "正大路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "外滩大桥"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "鼓楼"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "城隍庙"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "宁波火车站"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "云霞路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "丽园南路"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "客运中心"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "藕池"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "轻纺城"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "石碶"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "鄞州大道"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "栎社"
			},
			{
				cityName: "宁波市",
				lineName: "地铁2号线(清水浦-栎社国际机场)",
				stepName: "栎社国际机场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "堰桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "锡北运河"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "西漳"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "天一"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "刘潭"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "庄前"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "民丰"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "无锡火车站"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "胜利门"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "三阳广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "南禅寺"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "谈渡桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "太湖广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "清名桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "人民医院"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "华清大桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "扬名"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "南湖家园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "塘铁桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "金匮公园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "市民中心"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "文化宫"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "江南大学"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(堰桥-长广溪)",
				stepName: "长广溪"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "梅园开原寺"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "荣巷"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "小桃源"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "河埒口"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "大王基"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "梁溪大桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "五爱广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "三阳广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "东林广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "上马墩"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "靖海"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "广益"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "柏庄"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "东亭"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "庄桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "云林"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "九里河公园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "查桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "映月湖公园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "迎宾广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(梅园开原寺-无锡东站)",
				stepName: "无锡东站"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "长广溪"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "江南大学"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "文化宫"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "市民中心"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "金匮公园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "塘铁桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "南湖家园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "扬名"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "华清大桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "人民医院"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "清名桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "太湖广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "谈渡桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "南禅寺"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "三阳广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "胜利门"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "无锡火车站"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "民丰"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "庄前"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "刘潭"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "天一"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "西漳"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "锡北运河"
			},
			{
				cityName: "无锡市",
				lineName: "地铁1号线(长广溪-堰桥)",
				stepName: "堰桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "无锡东站"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "迎宾广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "映月湖公园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "查桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "九里河公园"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "云林"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "庄桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "东亭"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "柏庄"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "广益"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "靖海"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "上马墩"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "东林广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "三阳广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "五爱广场"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "梁溪大桥"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "大王基"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "河埒口"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "小桃源"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "荣巷"
			},
			{
				cityName: "无锡市",
				lineName: "地铁2号线(无锡东站-梅园开原寺)",
				stepName: "梅园开原寺"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "青岛北站"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "永平路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "振华路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "君峰路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "李村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "万年泉路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "海尔路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "地铁大厦"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "长沙路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "双山"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "清江路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "错埠岭"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "敦化路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "宁夏路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "江西路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "五四广场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "延安三路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "太平角公园"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "中山公园"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "汇泉广场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "人民会堂"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛北站-青岛站)",
				stepName: "青岛站"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "苗岭路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "会展中心"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "青岛二中"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "青岛科大"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "张村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "枯桃"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "海洋大学"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "世博园"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "北宅"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "北九水"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "庙石"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "浦里"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "鳌山卫"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "山东大学"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "蓝色硅谷"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "水泊"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "博览中心"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "温泉东"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "皋虞"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "臧村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(苗岭路-钱谷山)",
				stepName: "钱谷山"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "青岛站"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "人民会堂"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "汇泉广场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "中山公园"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "太平角公园"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "延安三路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "五四广场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "江西路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "宁夏路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "敦化路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "错埠岭"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "清江路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "双山"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "长沙路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "地铁大厦"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "海尔路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "万年泉路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "李村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "君峰路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "振华路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "永平路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁3号线(青岛站-青岛北站)",
				stepName: "青岛北站"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "李村公园"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "李村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "枣山路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "华楼山路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "东韩"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "辽阳东路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "同安路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "苗岭路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "石老人浴场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "海安路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "海川路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "海游路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "麦岛"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "高雄路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "燕儿岛路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "浮山所"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "五四广场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(李村公园-芝泉路)",
				stepName: "芝泉路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "钱谷山"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "臧村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "皋虞"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "温泉东"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "博览中心"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "水泊"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "蓝色硅谷"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "山东大学"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "鳌山卫"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "浦里"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "庙石"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "北九水"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "北宅"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "世博园"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "海洋大学"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "枯桃"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "张村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "青岛科大"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "青岛二中"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "会展中心"
			},
			{
				cityName: "青岛市",
				lineName: "地铁11号线(钱谷山-苗岭路)",
				stepName: "苗岭路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "芝泉路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "五四广场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "浮山所"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "燕儿岛路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "高雄路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "麦岛"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "海游路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "海川路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "海安路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "石老人浴场"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "苗岭路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "同安路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "辽阳东路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "东韩"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "华楼山路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "枣山路"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "李村"
			},
			{
				cityName: "青岛市",
				lineName: "地铁2号线(芝泉路-李村公园)",
				stepName: "李村公园"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "瑶湖西"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "奥体中心"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "太子殿"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "艾溪湖东"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "艾溪湖西"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "高新大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "青山湖大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "谢家村"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "彭家桥"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "师大南路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "丁公路北"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "八一广场"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "八一馆"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "万寿宫"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "滕王阁"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "秋水广场"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "地铁大厦"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "卫东"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "绿茵路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "庐山南大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "珠江路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "长江路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "孔目湖"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(瑶湖西-双港)",
				stepName: "双港"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "南路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "大岗"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "生米"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "九龙湖南"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "市民中心"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "鹰潭街"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "国博"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "西站南广场"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "南昌西站"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "龙岗"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "国体中心"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "卧龙山"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "岭北"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "前湖大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "学府大道东"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "翠苑路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(南路-地铁大厦)",
				stepName: "地铁大厦"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "双港"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "孔目湖"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "长江路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "珠江路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "庐山南大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "绿茵路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "卫东"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "地铁大厦"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "秋水广场"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "滕王阁"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "万寿宫"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "八一馆"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "八一广场"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "丁公路北"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "师大南路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "彭家桥"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "谢家村"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "青山湖大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "高新大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "艾溪湖西"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "艾溪湖东"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "太子殿"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "奥体中心"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通1号线(双港-瑶湖西)",
				stepName: "瑶湖西"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "地铁大厦"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "翠苑路"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "学府大道东"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "前湖大道"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "岭北"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "卧龙山"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "国体中心"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "龙岗"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "南昌西站"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "西站南广场"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "国博"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "鹰潭街"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "市民中心"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "九龙湖南"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "生米"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "大岗"
			},
			{
				cityName: "南昌市",
				lineName: "轨道交通2号线(地铁大厦-南路)",
				stepName: "南路"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "象峰"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "秀山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "罗汉山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "福州火车站"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "斗门"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "树兜"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "屏山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "东街口"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "南门兜"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "茶亭"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "达道"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "上藤"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "三叉街"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "白湖亭"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "葫芦阵"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "黄山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "排下"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "城门"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "三角埕"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "胪雷"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(象峰-福州火车南站)",
				stepName: "福州火车南站"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "福州火车南站"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "胪雷"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "三角埕"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "城门"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "排下"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "黄山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "葫芦阵"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "白湖亭"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "三叉街"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "上藤"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "达道"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "茶亭"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "南门兜"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "东街口"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "屏山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "树兜"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "斗门"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "福州火车站"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "罗汉山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "秀山"
			},
			{
				cityName: "福州市",
				lineName: "地铁1号线(福州火车南站-象峰)",
				stepName: "象峰"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "虎门火车站"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "展览中心"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "珊美"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "寮厦"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "陈屋"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "蛤地"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "西平"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "鸿福路"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "旗峰公园"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "东城"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "天宝"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "下桥"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "榴花公园"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "茶山"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(虎门火车站-东莞火车站)",
				stepName: "东莞火车站"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "东莞火车站"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "茶山"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "榴花公园"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "下桥"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "天宝"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "东城"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "旗峰公园"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "鸿福路"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "西平"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "蛤地"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "陈屋"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "寮厦"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "珊美"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "展览中心"
			},
			{
				cityName: "东莞市",
				lineName: "地铁2号线(东莞火车站-虎门火车站)",
				stepName: "虎门火车站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "西津"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "安吉客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "苏卢"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "三十三中"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "秀厢"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "明秀路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "火车站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "朝阳广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "南宁剧场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "福建园"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "亭洪路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "石柱岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "江南客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "大沙田"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "建设路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "石子塘"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "金象"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(西津-玉洞)",
				stepName: "玉洞"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "火车东站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "佛子岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "百花岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "埌东客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "凤岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "东盟商务区"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "万象城"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "会展中心"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "金湖广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "南湖"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "麻村"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "民族广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "新民路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "朝阳广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "火车站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "白苍岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "广西大学"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "鲁班路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "动物园"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "清川"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "民族大学"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "西乡塘客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "鹏飞路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "南职院"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(火车东站-石埠)",
				stepName: "石埠"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "石埠"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "南职院"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "鹏飞路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "西乡塘客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "民族大学"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "清川"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "动物园"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "鲁班路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "广西大学"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "白苍岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "火车站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "朝阳广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "新民路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "民族广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "麻村"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "南湖"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "金湖广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "会展中心"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "万象城"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "东盟商务区"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "凤岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "埌东客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "百花岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "佛子岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁1号线(石埠-火车东站)",
				stepName: "火车东站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "玉洞"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "金象"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "石子塘"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "建设路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "大沙田"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "江南客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "石柱岭"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "亭洪路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "福建园"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "南宁剧场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "朝阳广场"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "火车站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "明秀路"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "秀厢"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "三十三中"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "苏卢"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "安吉客运站"
			},
			{
				cityName: "南宁市",
				lineName: "地铁2号线(玉洞-西津)",
				stepName: "西津"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "合肥火车站"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "长淮"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "明光路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "大东门"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "包公园"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "合工大南区"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "朱岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "秋浦河路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "葛大店"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "望湖城"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "合肥南站"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "南站南广场"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "骆岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "高王"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "滨湖会展中心"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "紫庐"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "塘西河公园"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "金斗公园"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "云谷路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "万达城"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "万年埠"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "丙子铺"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(合肥火车站-九联圩)",
				stepName: "九联圩"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "三十埠"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "王岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "龙岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "东二十埠"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "漕冲"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "东七里"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "东五里井"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "三里街"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "大东门"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "四牌楼"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "三孝口"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "安农大"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "三里庵"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "五里墩"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "西七里塘"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "十里庙"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "科学大道"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "天柱路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "大蜀山"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "蜀山西"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "振兴路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "汽车西站"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "桂庄"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(三十埠-南岗)",
				stepName: "南岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "九联圩"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "丙子铺"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "万年埠"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "万达城"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "云谷路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "金斗公园"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "塘西河公园"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "紫庐"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "滨湖会展中心"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "高王"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "骆岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "南站南广场"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "合肥南站"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "望湖城"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "葛大店"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "秋浦河路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "朱岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "合工大南区"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "包公园"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "大东门"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "明光路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "长淮"
			},
			{
				cityName: "合肥市",
				lineName: "地铁1号线(九联圩-合肥火车站)",
				stepName: "合肥火车站"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "南岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "桂庄"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "汽车西站"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "振兴路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "蜀山西"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "大蜀山"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "天柱路"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "科学大道"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "十里庙"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "西七里塘"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "五里墩"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "三里庵"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "安农大"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "三孝口"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "四牌楼"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "大东门"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "三里街"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "东五里井"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "东七里"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "漕冲"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "东二十埠"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "龙岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "王岗"
			},
			{
				cityName: "合肥市",
				lineName: "地铁2号线(南岗-三十埠)",
				stepName: "三十埠"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "镇海路"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "中山公园"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "将军祠"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "文灶"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "湖滨东路"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "莲坂"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "莲花路口"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "吕厝"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "乌石浦"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "塘边"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "火炬园"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "殿前"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "高崎"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "集美学村"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "园博苑"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "杏林村"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "杏锦路"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "官任"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "诚毅广场"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "集美软件园"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "集美大道"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "天水路"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "厦门北站"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(镇海路-岩内)",
				stepName: "岩内"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "岩内"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "厦门北站"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "天水路"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "集美大道"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "集美软件园"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "诚毅广场"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "官任"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "杏锦路"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "杏林村"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "园博苑"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "集美学村"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "高崎"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "殿前"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "火炬园"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "塘边"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "乌石浦"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "吕厝"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "莲花路口"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "莲坂"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "湖滨东路"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "文灶"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "将军祠"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "中山公园"
			},
			{
				cityName: "厦门市",
				lineName: "地铁1号线(岩内-镇海路)",
				stepName: "镇海路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "三圣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "建安"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "山景南"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "山景北"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "建生"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "青松"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "麒麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(三圣-兆康)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "青松"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "建生"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "鸣琴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "建安"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "505(兆康-三圣)",
				stepName: "三圣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "大兴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "大兴(南)"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "银围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "蔡意桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "河田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "丰景园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "屯门泳池"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "兆禧"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(田景-屯门码头)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "兆禧"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "屯门泳池"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "丰景园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "河田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "蔡意桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "银围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "大兴(南)"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "大兴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "507(屯门码头-田景)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "美乐"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "蝴蝶"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "轻铁车厂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "龙门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "青山村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "青云"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "鸣琴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "大兴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "大兴(南)"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "银围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "泽丰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "屯门医院"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(屯门码头-元朗)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "屯门医院"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "泽丰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "银围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "大兴(南)"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "大兴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "鸣琴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "青云"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "青山村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "龙门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "轻铁车厂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "蝴蝶"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "美乐"
			},
			{
				cityName: "香港特别行政区",
				lineName: "610(元朗-屯门码头)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "兆禧"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "屯门泳池"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "丰景园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "杯渡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "何福堂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "新墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "景峰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "凤地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(屯门码头-元朗)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "凤地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "景峰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "新墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "何福堂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "杯渡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "丰景园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "屯门泳池"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "兆禧"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614(元朗-屯门码头)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "凤地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "景峰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "新墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "何福堂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "杯渡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "丰景园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "屯门泳池"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "兆禧"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(兆康-屯门码头)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "兆禧"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "屯门泳池"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "丰景园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "兆麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "杯渡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "何福堂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "新墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "景峰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "凤地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "614p(屯门码头-兆康)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "美乐"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "蝴蝶"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "轻铁车厂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "龙门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "青山村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "青云"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "鸣琴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "建生"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "青松"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(屯门码头-元朗)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "青松"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "建生"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "鸣琴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "青云"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "青山村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "龙门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "轻铁车厂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "蝴蝶"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "美乐"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615(元朗-屯门码头)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "美乐"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "蝴蝶"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "轻铁车厂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "龙门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "青山村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "青云"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "鸣琴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "建生"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "青松"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "麒麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(屯门码头-兆康)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "麒麟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "青松"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "建生"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "田景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "良景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "新围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "石排"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "鸣琴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "青云"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "青山村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "龙门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "轻铁车厂"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "蝴蝶"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "美乐"
			},
			{
				cityName: "香港特别行政区",
				lineName: "615p(兆康-屯门码头)",
				stepName: "屯门码头"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天慈"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "银座"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天荣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天悦"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天秀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "湿地公园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天恒"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天逸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "颂富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天瑞"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "乐湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天耀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "705(天水围-天水围)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天耀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "乐湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天瑞"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "颂富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天逸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天恒"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "湿地公园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天秀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天悦"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天荣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "银座"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天慈"
			},
			{
				cityName: "香港特别行政区",
				lineName: "706(天水围-天水围)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "天逸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "天富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "颂富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "翠湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "天荣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "银座"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "天湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "天慈"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "坑尾村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "屯门医院"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "泽丰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "蔡意桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "河田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(天逸-友爱)",
				stepName: "友爱"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "友爱"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "安定"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "市中心"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "河田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "蔡意桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "泽丰"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "屯门医院"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "蓝地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "泥围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "钟屋村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "洪水桥"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "坑尾村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "天慈"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "天湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "银座"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "天荣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "翠湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "颂富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "天富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "751(友爱-天逸)",
				stepName: "天逸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "天逸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "天富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "颂富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "天瑞"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "乐湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "天耀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "坑尾村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(天逸-元朗)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "大棠路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "康乐路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "丰年路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "水边围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "屏山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "塘坊村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "坑尾村"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "天耀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "乐湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "天瑞"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "颂富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "天富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "761p(元朗-天逸)",
				stepName: "天逸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(海怡半岛-金钟)",
				stepName: "海怡半岛"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(海怡半岛-金钟)",
				stepName: "利东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(海怡半岛-金钟)",
				stepName: "黄竹坑"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(海怡半岛-金钟)",
				stepName: "海洋公园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(海怡半岛-金钟)",
				stepName: "金钟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(金钟-海怡半岛)",
				stepName: "金钟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(金钟-海怡半岛)",
				stepName: "海洋公园"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(金钟-海怡半岛)",
				stepName: "黄竹坑"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(金钟-海怡半岛)",
				stepName: "利东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "南港岛线(金钟-海怡半岛)",
				stepName: "海怡半岛"
			},
			{
				cityName: "香港特别行政区",
				lineName: "迪士尼线(欣澳-迪士尼)",
				stepName: "欣澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "迪士尼线(欣澳-迪士尼)",
				stepName: "迪士尼"
			},
			{
				cityName: "香港特别行政区",
				lineName: "迪士尼线(迪士尼-欣澳)",
				stepName: "迪士尼"
			},
			{
				cityName: "香港特别行政区",
				lineName: "迪士尼线(迪士尼-欣澳)",
				stepName: "欣澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "东涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "欣澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "青衣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "荔景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "南昌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "奥运"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "九龙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(东涌-香港)",
				stepName: "香港"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "香港"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "九龙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "奥运"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "南昌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "荔景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "青衣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "欣澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东涌线(香港-东涌)",
				stepName: "东涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "坚尼地城"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "香港大学"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "西营盘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "上环"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "中环"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "金钟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "湾仔"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "铜锣湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "天后"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "炮台山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "北角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "鰂鱼涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "太古"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "西湾河"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "筲箕湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "杏花邨"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(坚尼地城-柴湾)",
				stepName: "柴湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "柴湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "杏花邨"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "筲箕湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "西湾河"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "太古"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "鰂鱼涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "北角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "炮台山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "天后"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "铜锣湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "湾仔"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "金钟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "中环"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "上环"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "西营盘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "香港大学"
			},
			{
				cityName: "香港特别行政区",
				lineName: "港岛线(柴湾-坚尼地城)",
				stepName: "坚尼地城"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "调景岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "油塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "蓝田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "观塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "牛头角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "九龙湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "彩虹"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "钻石山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "黄大仙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "乐富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "九龙塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "石硖尾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "太子"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "旺角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "油麻地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "何文田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(调景岭-黄埔)",
				stepName: "黄埔"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "黄埔"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "何文田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "油麻地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "旺角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "太子"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "石硖尾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "九龙塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "乐富"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "黄大仙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "钻石山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "彩虹"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "九龙湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "牛头角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "观塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "蓝田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "油塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "观塘线(黄埔-调景岭)",
				stepName: "调景岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(香港-博览馆)",
				stepName: "香港"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(香港-博览馆)",
				stepName: "九龙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(香港-博览馆)",
				stepName: "青衣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(香港-博览馆)",
				stepName: "机场"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(香港-博览馆)",
				stepName: "博览馆"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(博览馆-香港)",
				stepName: "博览馆"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(博览馆-香港)",
				stepName: "机场"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(博览馆-香港)",
				stepName: "青衣"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(博览馆-香港)",
				stepName: "九龙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "机场快线(博览馆-香港)",
				stepName: "香港"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-宝琳)",
				stepName: "北角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-宝琳)",
				stepName: "鰂鱼涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-宝琳)",
				stepName: "油塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-宝琳)",
				stepName: "调景岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-宝琳)",
				stepName: "将军澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-宝琳)",
				stepName: "坑口"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-宝琳)",
				stepName: "宝琳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(宝琳-北角)",
				stepName: "宝琳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(宝琳-北角)",
				stepName: "坑口"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(宝琳-北角)",
				stepName: "将军澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(宝琳-北角)",
				stepName: "调景岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(宝琳-北角)",
				stepName: "油塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(宝琳-北角)",
				stepName: "鰂鱼涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(宝琳-北角)",
				stepName: "北角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-康城)",
				stepName: "北角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-康城)",
				stepName: "鰂鱼涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-康城)",
				stepName: "油塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-康城)",
				stepName: "调景岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-康城)",
				stepName: "将军澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(北角-康城)",
				stepName: "康城"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(康城-北角)",
				stepName: "康城"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(康城-北角)",
				stepName: "将军澳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(康城-北角)",
				stepName: "调景岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(康城-北角)",
				stepName: "油塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(康城-北角)",
				stepName: "鰂鱼涌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "将军澳线(康城-北角)",
				stepName: "北角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "中环"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "金钟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "尖沙咀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "佐敦"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "油麻地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "旺角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "太子"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "深水埗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "长沙湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "荔枝角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "美孚"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "荔景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "葵芳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "葵兴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "大窝口"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(中环-荃湾)",
				stepName: "荃湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "荃湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "大窝口"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "葵兴"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "葵芳"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "荔景"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "美孚"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "荔枝角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "长沙湾"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "深水埗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "太子"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "旺角"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "油麻地"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "佐敦"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "尖沙咀"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "金钟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "荃湾线(荃湾-中环)",
				stepName: "中环"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "红磡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "旺角东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "九龙塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "大围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "沙田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "火炭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "大学"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "大埔墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "太和"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "粉岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "上水"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-落马洲)",
				stepName: "落马洲"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "落马洲"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "上水"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "粉岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "太和"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "大埔墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "大学"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "火炭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "沙田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "大围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "九龙塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "旺角东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(落马洲-红磡)",
				stepName: "红磡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "罗湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "上水"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "粉岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "太和"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "大埔墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "大学"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "火炭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "沙田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "大围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "九龙塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "旺角东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(罗湖-红磡)",
				stepName: "红磡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "红磡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "旺角东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "九龙塘"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "大围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "沙田"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "火炭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "大学"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "大埔墟"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "太和"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "粉岭"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "上水"
			},
			{
				cityName: "香港特别行政区",
				lineName: "东铁线(红磡-罗湖)",
				stepName: "罗湖"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "大围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "车公庙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "沙田围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "第一城"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "石门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "大水坑"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "恒安"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "马鞍山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(大围-乌溪沙)",
				stepName: "乌溪沙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "乌溪沙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "马鞍山"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "恒安"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "大水坑"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "石门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "第一城"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "沙田围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "车公庙"
			},
			{
				cityName: "香港特别行政区",
				lineName: "马鞍山线(乌溪沙-大围)",
				stepName: "大围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "红磡"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "尖东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "柯士甸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "南昌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "美孚"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "荃湾西"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "锦上路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "朗屏"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(红磡-屯门)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "屯门"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "兆康"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "天水围"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "朗屏"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "元朗"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "锦上路"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "荃湾西"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "美孚"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "南昌"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "柯士甸"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "尖东"
			},
			{
				cityName: "香港特别行政区",
				lineName: "西铁线(屯门-红磡)",
				stepName: "红磡"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "顶埔"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "永宁"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "土城"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "海山"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "亚东医院"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "府中"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "板桥"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "新埔"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "江子翠"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "龙山寺"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "西门"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "善导寺"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "忠孝新生"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "忠孝复兴"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "忠孝敦化"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "国父纪念馆"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "市政府"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "永春"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "后山埤"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "昆阳"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "南港"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(顶埔-南港展览馆)",
				stepName: "南港展览馆"
			},
			{
				cityName: "台北市",
				lineName: "小碧潭线(七张-小碧潭)",
				stepName: "七张"
			},
			{
				cityName: "台北市",
				lineName: "小碧潭线(七张-小碧潭)",
				stepName: "小碧潭"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "南势角"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "景安"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "永安市场"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "顶溪"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "古亭"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "东门"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "忠孝新生"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "松江南京"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "行天宫"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "中山国小"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "民权西路"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "大桥头"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "三重国小"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "三和国中"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "徐汇中学"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "三民高中"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-芦洲)",
				stepName: "芦洲"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(机场第二航厦-台北车站)",
				stepName: "机场第二航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(机场第二航厦-台北车站)",
				stepName: "机场第一航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(机场第二航厦-台北车站)",
				stepName: "长庚医院"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(机场第二航厦-台北车站)",
				stepName: "新北产业园区"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(机场第二航厦-台北车站)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(猫空站-动物园站)",
				stepName: "猫空站"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(猫空站-动物园站)",
				stepName: "指南宫站"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(猫空站-动物园站)",
				stepName: "动物园南站"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(猫空站-动物园站)",
				stepName: "动物园站"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "南势角"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "景安"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "永安市场"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "顶溪"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "古亭"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "东门"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "忠孝新生"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "松江南京"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "行天宫"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "中山国小"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "民权西路"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "大桥头"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "台北桥"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "菜寮"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "三重"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "先啬宫"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "头前庄"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "新庄"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "辅大"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "丹凤"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(南势角-回龙)",
				stepName: "回龙"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "动物园"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "木栅"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "万芳社区"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "万芳医院"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "辛亥"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "麟光"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "六张犁"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "科技大楼"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "大安"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "忠孝复兴"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "南京复兴"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "中山国中"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "松山机场"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "大直"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "剑南路"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "西湖"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "港墘"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "文德"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "内湖"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "大湖公园"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "葫洲"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "东湖"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "南港软体园区"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(动物园-南港展览馆)",
				stepName: "南港展览馆"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(动物园站-猫空站)",
				stepName: "动物园站"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(动物园站-猫空站)",
				stepName: "动物园南站"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(动物园站-猫空站)",
				stepName: "指南宫站"
			},
			{
				cityName: "台北市",
				lineName: "猫空缆车(动物园站-猫空站)",
				stepName: "猫空站"
			},
			{
				cityName: "台北市",
				lineName: "新北投线(新北投-北投)",
				stepName: "新北投"
			},
			{
				cityName: "台北市",
				lineName: "新北投线(新北投-北投)",
				stepName: "北投"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "环北"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "兴南"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "桃园体育园区"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "高铁桃园站"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "领航"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "横山"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "大园"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "机场旅馆"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "机场第二航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "机场第一航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "坑口"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "山鼻"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "林口"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "长庚医院"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "体育大学"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "泰山贵和"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "泰山"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "新庄副都心"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "新北产业园区"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "三重"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(环北-台北车站)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "回龙"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "丹凤"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "辅大"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "新庄"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "头前庄"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "先啬宫"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "三重"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "菜寮"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "台北桥"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "大桥头"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "民权西路"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "中山国小"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "行天宫"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "松江南京"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "忠孝新生"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "东门"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "古亭"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "顶溪"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "永安市场"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "景安"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(回龙-南势角)",
				stepName: "南势角"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "新店"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "新店区公所"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "七张"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "大坪林"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "景美"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "万隆"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "公馆"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "台电大楼"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "古亭"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "中正纪念堂"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "小南门"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "西门"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "北门"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "中山"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "松江南京"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "南京复兴"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "台北小巨蛋"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "南京三民"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(新店-松山)",
				stepName: "松山"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "南港展览馆"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "南港软体园区"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "东湖"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "葫洲"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "大湖公园"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "内湖"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "文德"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "港墘"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "西湖"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "剑南路"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "大直"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "松山机场"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "中山国中"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "南京复兴"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "忠孝复兴"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "大安"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "科技大楼"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "六张犁"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "麟光"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "辛亥"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "万芳医院"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "万芳社区"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "木栅"
			},
			{
				cityName: "台北市",
				lineName: "BR文湖线(南港展览馆-动物园)",
				stepName: "动物园"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "象山"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "台北101/世贸"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "信义安和"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "大安"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "大安森林公园"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "东门"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "中正纪念堂"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "台大医院"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "中山"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "双连"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "民权西路"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "圆山"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "剑潭"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "士林"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "芝山"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "明德"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "石牌"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "唭哩岸"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "奇岩"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "北投"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "复兴岗"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "忠义"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "关渡"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "竹围"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "红树林"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(象山-淡水)",
				stepName: "淡水"
			},
			{
				cityName: "台北市",
				lineName: "小碧潭线(小碧潭-七张)",
				stepName: "小碧潭"
			},
			{
				cityName: "台北市",
				lineName: "小碧潭线(小碧潭-七张)",
				stepName: "七张"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "南港展览馆"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "南港"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "昆阳"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "后山埤"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "永春"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "市政府"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "国父纪念馆"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "忠孝敦化"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "忠孝复兴"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "忠孝新生"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "善导寺"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "西门"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "龙山寺"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "江子翠"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "新埔"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "板桥"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "府中"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "亚东医院"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "海山"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "土城"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "永宁"
			},
			{
				cityName: "台北市",
				lineName: "BL板南线(南港展览馆-顶埔)",
				stepName: "顶埔"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "芦洲"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "三民高中"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "徐汇中学"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "三和国中"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "三重国小"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "大桥头"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "民权西路"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "中山国小"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "行天宫"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "松江南京"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "忠孝新生"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "东门"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "古亭"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "顶溪"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "永安市场"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "景安"
			},
			{
				cityName: "台北市",
				lineName: "O中和新芦线(芦洲-南势角)",
				stepName: "南势角"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "松山"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "南京三民"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "台北小巨蛋"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "南京复兴"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "松江南京"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "中山"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "北门"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "西门"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "小南门"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "中正纪念堂"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "古亭"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "台电大楼"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "公馆"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "万隆"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "景美"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "大坪林"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "七张"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "新店区公所"
			},
			{
				cityName: "台北市",
				lineName: "G松山新店线(松山-新店)",
				stepName: "新店"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "淡水"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "红树林"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "竹围"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "关渡"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "忠义"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "复兴岗"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "北投"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "奇岩"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "唭哩岸"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "石牌"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "明德"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "芝山"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "士林"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "剑潭"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "圆山"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "民权西路"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "双连"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "中山"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "台大医院"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "中正纪念堂"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "东门"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "大安森林公园"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "大安"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "信义安和"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "台北101/世贸"
			},
			{
				cityName: "台北市",
				lineName: "R淡水信义线(淡水-象山)",
				stepName: "象山"
			},
			{
				cityName: "台北市",
				lineName: "新北投线(北投-新北投)",
				stepName: "北投"
			},
			{
				cityName: "台北市",
				lineName: "新北投线(北投-新北投)",
				stepName: "新北投"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(台北车站-机场第二航厦)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(台北车站-机场第二航厦)",
				stepName: "新北产业园区"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(台北车站-机场第二航厦)",
				stepName: "长庚医院"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(台北车站-机场第二航厦)",
				stepName: "机场第一航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运直达车(台北车站-机场第二航厦)",
				stepName: "机场第二航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "台北车站"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "三重"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "新北产业园区"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "新庄副都心"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "泰山"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "泰山贵和"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "体育大学"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "长庚医院"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "林口"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "山鼻"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "坑口"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "机场第一航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "机场第二航厦"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "机场旅馆"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "大园"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "横山"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "领航"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "高铁桃园站"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "桃园体育园区"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "兴南"
			},
			{
				cityName: "台北市",
				lineName: "A桃园机场捷运普通车(台北车站-环北)",
				stepName: "环北"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "南冈山"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "桥头火车站"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "桥头糖厂"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "青埔"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "都会公园"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "后劲"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "楠梓加工区"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "油厂国小"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "世运"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "左营"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "生态园区"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "巨蛋"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "凹子底"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "后驿"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "高雄车站"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "美丽岛"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "中央公园"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "三多商圈"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "狮甲"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "凯旋"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "前镇高中"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "草衙"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "高雄国际机场"
			},
			{
				cityName: "高雄市",
				lineName: "红线(南冈山-小港)",
				stepName: "小港"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "大寮"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "凤山国中"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "大东"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "凤山"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "凤山西站"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "卫武营"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "技击馆"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "五块厝"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "文化中心"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "信义国小"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "美丽岛"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "市议会"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "盐埕埔"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(大寮-西子湾)",
				stepName: "西子湾"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "西子湾"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "盐埕埔"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "市议会"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "美丽岛"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "信义国小"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "文化中心"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "五块厝"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "技击馆"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "卫武营"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "凤山西站"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "凤山"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "大东"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "凤山国中"
			},
			{
				cityName: "高雄市",
				lineName: "橘线(西子湾-大寮)",
				stepName: "大寮"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "小港"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "高雄国际机场"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "草衙"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "前镇高中"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "凯旋"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "狮甲"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "三多商圈"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "中央公园"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "美丽岛"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "高雄车站"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "后驿"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "凹子底"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "巨蛋"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "生态园区"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "左营"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "世运"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "油厂国小"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "楠梓加工区"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "后劲"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "都会公园"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "青埔"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "桥头糖厂"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "桥头火车站"
			},
			{
				cityName: "高雄市",
				lineName: "红线(小港-南冈山)",
				stepName: "南冈山"
			}
		],

		deptList: ['1000万以上', '600-1000万', '300-600万', '100-300万', '50-100万', '10-50万', '10万以下'],
		deptCurrent:null,
		// 地铁线
		coreList: [{
				"cn_name": "北京市",
				"cename": "beijing",
				"code": 131,
				"cpre": "bj"
			},
			{
				"cn_name": "上海市",
				"cename": "shanghai",
				"code": 289,
				"cpre": "shh",
				"cxfDis": 0
			},
			{
				"cn_name": "广州市",
				"cename": "guangzhou",
				"code": 257,
				"cpre": "gzh"
			},
			{
				"cn_name": "深圳市",
				"cename": "shenzhen",
				"code": 340,
				"cpre": "szh"
			},
			{
				"cn_name": "重庆市",
				"cename": "chongqing",
				"code": 132,
				"cpre": "chq"
			},
			{
				"cn_name": "天津市",
				"cename": "tianjin",
				"code": 332,
				"cpre": "tj"
			},
			{
				"cn_name": "石家庄市",
				"cename": "shijiazhuang",
				"code": 150,
				"cpre": "shjzh"
			},
			{
				"cn_name": "南京市",
				"cename": "nanjing",
				"code": 315,
				"cpre": "nj"
			},
			{
				"cn_name": "成都市",
				"cename": "chengdu",
				"code": 75,
				"cpre": "chd"
			},
			{
				"cn_name": "沈阳市",
				"cename": "shenyang",
				"code": 58,
				"cpre": "shy"
			},
			{
				"cn_name": "杭州市",
				"cename": "hangzhou",
				"code": 179,
				"cpre": "hzh"
			},
			{
				"cn_name": "武汉市",
				"cename": "wuhan",
				"code": 218,
				"cpre": "wh"
			},
			{
				"cn_name": "长沙市",
				"cename": "changsha",
				"code": 158,
				"cpre": "cs"
			},
			{
				"cn_name": "苏州市",
				"cename": "suzhou",
				"code": 224,
				"cpre": "suz"
			},
			{
				"cn_name": "大连市",
				"cename": "dalian",
				"code": 167,
				"cpre": "dl"
			},
			{
				"cn_name": "长春市",
				"cename": "changchun",
				"code": 53,
				"cpre": "chc"
			},
			{
				"cn_name": "西安市",
				"cename": "xian",
				"code": 233,
				"cpre": "xian"
			},
			{
				"cn_name": "昆明市",
				"cename": "kunming",
				"code": 104,
				"cpre": "km"
			},
			{
				"cn_name": "佛山市",
				"cename": "foshan",
				"code": 138,
				"cpre": "fsh"
			},
			{
				"cn_name": "哈尔滨市",
				"cename": "haerbin",
				"code": 48,
				"cpre": "hrb"
			},
			{
				"cn_name": "郑州市",
				"cename": "zhengzhou",
				"code": 268,
				"cpre": "zhzh"
			},
			{
				"cn_name": "宁波市",
				"cename": "ningbo",
				"code": 180,
				"cpre": "nbo"
			},
			{
				"cn_name": "无锡市",
				"cename": "wuxi",
				"code": 317,
				"cpre": "wuxi"
			},
			{
				"cn_name": "温州市",
				"cename": "wenzhou",
				"code": 178,
				"cpre": "wenzhou"
			},
			{
				"cn_name": "常州市",
				"cename": "changzhou",
				"code": 348,
				"cpre": "changzhou"
			},
			{
				"cn_name": "青岛市",
				"cename": "qingdao",
				"code": 236,
				"cpre": "qd"
			},
			{
				"cn_name": "济南市",
				"cename": "jinan",
				"code": 288,
				"cpre": "jn"
			},
			{
				"cn_name": "南昌市",
				"cename": "nanchang",
				"code": 163,
				"cpre": "nanchang"
			},
			{
				"cn_name": "福州市",
				"cename": "fuzhou",
				"code": 300,
				"cpre": "fuzhou"
			},
			{
				"cn_name": "东莞市",
				"cename": "dongguan",
				"code": 119,
				"cpre": "dongguan"
			},
			{
				"cn_name": "南宁市",
				"cename": "nanning",
				"code": 261,
				"cpre": "nanning"
			},
			{
				"cn_name": "合肥市",
				"cename": "hefei",
				"code": 127,
				"cpre": "hefei"
			},
			{
				"cn_name": "厦门市",
				"cename": "xiamen",
				"code": 194,
				"cpre": "xiamen"
			},
			{
				"cn_name": "乌鲁木齐市",
				"cename": "wulumuqi",
				"code": 92,
				"cpre": "wulumuqi"
			},
			{
				"cn_name": "贵阳市",
				"cename": "guiyang",
				"code": 146,
				"cpre": "guiyang"
			},
			{
				"cn_name": "兰州市",
				"cename": "lanzhou",
				"code": 36,
				"cpre": "lanzhou"
			},
			{
				"cn_name": "徐州市",
				"cename": "xuzhou",
				"code": 316,
				"cpre": "xuzhou"
			},
			{
				"cn_name": "香港特别行政区",
				"cename": "hongkong",
				"code": 2912,
				"cpre": "hk"
			},
			{
				"cn_name": "台北市",
				"cename": "taibei",
				"code": 9002,
				"cpre": "shh",
				"cxfDis": 0
			},
			{
				"cn_name": "高雄市",
				"cename": "gaoxiong",
				"code": 9019,
				"cpre": "cs"
			}
		],
		lineList: [],
		lineCurrent: null,
		// 地铁线
		lineadrsList: [],
		lineadrsCurrent: null,
		// 更多
		cityType: 1,
		more: {
			time: '',
			city: '',
			province: ''
		},
		// 订阅
		subscribe: {
			hopeIndustry: '',
			houseProject: '',
			household: '',
			expyearsalStart: '',
			expyearsalEnd: ''
		}
	}
	// 选择的条件
	$scope.select = {
		// city:"",
		position:"",
		otherAll:"",
		salary:"",
		publishDate:"",
		firstDegree:"",
		gender:"",
		proName:"",
		sbwayline:"",
		subwaystation:"",
		// id
		yingPinId: '',
		/**部门 ex:酒店事业部经理*/
		dept: '',
		/** ex:年薪100-150万*/
		gongzi: '',
		/** ex:某地产公司*/
		company: '',
		// 工作
		job: '',
		/** ex:北京*/
		address: '',
		/** ex:10-12年*/
		workyear: '',
		/** ex:大专统招*/
		edu: '',
		/** ex:男*/
		gender: '',
		/** ex:悬赏金￥80000*/
		price: '',
		/** ex:客户经理*/
		manager: '',
		/** ex:康飞龄*/
		managerName: '',
		line: '',
		lineadrs: '',
		province: ''
	}

	$scope.allPositionData = {};
	$scope.areaData = {};
	$scope.sexDate = {};
	$scope.areaDatalist = {};
 	$scope.sexDatelist = {};
 	$scope.areaDatali = {};
 	$scope.sexDateli = {};
 	$scope.eduCation = {};
 	$scope.eduCatio = {};
 	$scope.subordinateFunctions = {};
 	$scope.jobStatus = {};
 	$scope.Industry = {};
 	$scope.highestAcademicQualifications = {};
	// console.log(11111111111);
	personService.getParams().success(function (response) {
		if (response.success) {
			//console.log(JSON.parse(response))
			$scope.areaData = response.obj.b_city;
			$scope.sexDate = response.obj.gender2;
			$scope.areaDatalist = response.obj.b_city;
			$scope.sexDatelist = response.obj.gender2;
			$scope.areaDatali = response.obj.b_city;
			$scope.sexDateli = response.obj.gender2;
			$scope.eduCation = response.obj.qualifications;
			$scope.eduCatio = response.obj.qualifications;
			$scope.subordinateFunctions = response.obj.position;
			$scope.jobStatus = response.obj.personState;
			$scope.Industry = response.obj.industry;
			$scope.highestAcademicQualifications = response.obj.isdegree;

			$scope.Industryarr = [];
			$scope.Industryarr.push($scope.Industry);
			$scope.IndustryObj = [];
			for(var key in $scope.Industryarr){
				for(var i in $scope.Industryarr[key]){
					var obj = {};
					obj.id = i;
					obj.name = $scope.Industryarr[key][i];
					$scope.IndustryObj.push(obj);
				}
			};

		}
	})
	// 获取职位详情
	$scope.interestedProject = [];
	$scope.jobDetails = function(){
		var id=getUrlParam("id");
		var projectVistiNum = getUrlParam("projectVistiNum");
		yingpinService.jobDetails(id).success(function(response) {
			if (response.success) {
					var obj =JSON.parse(response.obj)
					obj.projectVistiNum = projectVistiNum;
					$scope.initData.jobDetails.push(obj);//更新智能
			}
		});

		//获取感兴趣的职位
		yingpinService.interestedProject(id).success(function(response) {
			if (response.success) {
				var obj = JSON.parse(response.obj)
				$scope.initData.interested.push(obj);
			}
		});
		
	}


	
	
	//获取职能筛选条件
	personService.sxoParams().success(function (response) {
		if (response.success) {
			let data = JSON.parse(response.obj);
			let newData = [];

			for (let i = 0; i < data.length; i++) {
				data[i].list = [];
			}
			for (let i = 0; i < data.length; i++) {
				for (let n = 0; n < data.length; n++) {
					if (data[i].id == data[n].pId) {
						data[i].list.push(data[n]);
					}
				}
				// $scope.initData.jobList.list=data[i].children;
			}
			for (let i = 0; i < data.length; i++) {
				if (data[i].list.length !== 0) {
					newData.push(data[i]);
				}
			}
			console.log($scope.initData.jobList,"只能")
			$scope.initData.jobList = newData;
			// console.log($scope.initData.jobList)
		}
	})




	$scope.selectCityType = function (type) {
		// $scope.initData.rouesubway.forEach(element => {
		// 	element.lineName = getCaption(element.lineName, 0)
		// });

		$scope.initData.cityType = type
			// console.log($scope.initData.rouesubway,"111111111")

		if (type) {
			var obj = {}
			// console.log($scope.initData.rouesubway,"111111111")
			$scope.initData.lineList = []
			$scope.initData.rouesubways = []

			$scope.initData.rouesubway.forEach(element => {
				if (element.cityName == $scope.select.address) {
					$scope.initData.rouesubways.push(element)
				}
			});

			for (var i = 0; i < $scope.initData.rouesubways.length; i++) {
				if (!obj[$scope.initData.rouesubways[i].lineName]) {
					$scope.initData.lineList.push($scope.initData.rouesubways[i]);
					obj[$scope.initData.rouesubways[i].lineName] = true;

				}
			}

			$('.mertocity').css('diaplay','none !important')
			$('.metro').css('display','flex');

			$('.cityPageBtn .onselect').addClass('on');
			$('.cityPageBtn .onselectw').removeClass('on')
			$('.city').css('display', 'none')
			// $scope.select.line = ''
			$scope.initData.lineCurrent = null
		} else {
			$('.cityPageBtn .onselect').removeClass('on');
			$('.cityPageBtn .onselectw').addClass('on')
			$('.metro').css('display','none');
			$('.metroList').css('display','none');

			$('.city').css('display', 'flex')
			// $('.mertocity').css('diaplay','flex')
			// $('.metro').css('display','none')
			// $scope.select.province = ''
			$scope.initData.provinceCurrent = null
		}
	}

	function getCaption(obj, state) {
		var index = obj.lastIndexOf("\(");
		if (state == 0) {
			obj = obj.substring(0, index);
		} else {
			obj = obj.substring(index + 1, obj.length);
		}
		return obj;
	}
	// 选择市区
	$scope.selectProvince = function (item, index) {
		var province = item.name;
		// rouesubway
		console.log("1111")
		

		if ($scope.initData.provinceCurrent == index) {
			$scope.initData.provinceCurrent = null
			$scope.select.province = ''
		} else {
			$scope.initData.provinceCurrent = index
			$scope.select.province = province
		}
		$scope.search(1, 10)
	}
	// 选择地铁
	$scope.selectLine = function (item, index) {
		$scope.initData.lineadrsList = []

		// selectLine
		$scope.select.sbwayline=item;
		// $scope.select.sbwayline=item;
		console.log(item,"99")
		// console.log(item)
		$scope.initData.rouesubways.forEach(element => {
			if (element.lineName == item) {
				$scope.initData.lineadrsList.push(element)
			}
		});
		// $scope.initData.lineadrsList
		// console.log($scope.initData.lineadrsList,"100")
		var lineNum = item;
		if ($scope.initData.lineCurrent == index) {
			$scope.initData.lineCurrent = null
			$scope.select.lineNum = ''
			$('.metroList').css('display', 'none');
			$scope.select.lineAdrs = ''
		} else {
			$scope.initData.lineCurrent = index
			$scope.select.lineNum = lineNum
			$('.metroList').css('display', 'flex');
		}
		$scope.search(1, 10)
	}

	// 选择地铁
	// $scope.selectLine = function(item,index) {
	// 	// selectLine
	// 	// console.log(item,"99")
	// 	$scope.initData.rouesubways.forEach(element => {
	// 		if(element.lineName==item){
	// 			$scope.initData.lineadrsList.push(element)
	// 		}
	// 	});
	// 	// $scope.initData.lineadrsList
	// 	// console.log($scope.initData.lineadrsList,"100")
	// 	var lineNum =item;
	// 	if ($scope.initData.lineCurrent == index) {
	// 		$scope.initData.lineCurrent = null
	// 		$scope.select.lineNum = ''
	// 		$('.metroList').css('display', 'none');
	// 		$scope.select.lineAdrs = ''
	// 	} else {
	// 		$scope.initData.lineCurrent = index
	// 		$scope.select.lineNum = lineNum
	// 		$('.metroList').css('display', 'flex');
	// 	}
	// 	$scope.search(1, 10)
	// }
	// 选择固定站点
	$scope.selectLineAdrs = function (item, index) {
		console.log(item)
	
		// $scope.select.subwaystation=item;
		var lineAdrs = item;
		
		if ($scope.initData.lineadrsCurrent == index) {
			$scope.initData.lineadrsCurrent = null
			$scope.select.lineAdrs = ''
		} else {
			$scope.initData.lineadrsCurrent = index
			$scope.select.lineAdrs = lineAdrs
		
			//$scope.select.subwaystation = subwaystation;
			//console.log(	$scope.select,"dedweffsdd")
		}
		$scope.search(1, 10)
	}
	// 更多失去
	var firstDegreeName = ''
	$scope.moreBlur = function (obj) {
		console.log('选择字段',obj)
		$scope.select[obj] = $scope.initData.more[obj]
		$scope.search(1, 10)
	}
	layui.use('form', function(){
		var form = layui.form;
		form.on('select(gender)', function(data){
			console.log('选择字段',data.value);
			$scope.select.gender = data.value
			$scope.search(1, 10)
		});
		form.on('select(publishDate)', function(data){
			console.log('选择字段',data.value);
			$scope.select.publishDate = data.value
			$scope.search(1, 10)
		});
		form.on('select(firstDegree)', function(data){
			console.log('选择字段',data);
			$scope.select.firstDegree = data.value
			$scope.initData.degreeName = data.value
			$scope.search(1, 10)
		});
		//各种基于事件的操作，下面会有进一步介绍
	  });
	
	// 更多选择
	$scope.selectChange = function(val){
		console.log('选择字段',val)
	}
	// 删除条件
	$scope.delItem = function (key) {
		$('.cityPageBtn').css('display', 'none');
		$('.cityMetro ').css('display', 'none');
		switch(key){
			case 'proName':
					$scope.initData.cityCurrent = null; 
					
			break;
			case 'job':
					$scope.initData.jobCurrent = null;
					
			break;
			case 'gongzi':
					$scope.initData.deptCurrent = null
			break;
			case 'time':
					$scope.initData.more.time = ''
			break;
			case 'city':
					$scope.initData.more.city = '';
			break;
			case 'province':
					$scope.initData.more.province = ''
			break;
		}
		delete($scope.select[key]);

		$scope.search(1, 10)
	}
	// 当前选择推荐的职位id
	$scope.chooseId=""
	$scope.personalDetail={
		chineseName:'',
		gender: '',
		phone: '',
		curyearsal: '',
		phone: '',
		recentPosition: '',
		incumbency: '',
		industry: '',
	}

	$scope.showDetail=function(id){

		$scope.recommends.forEach(item=>{
			if(item.personId == id){
				$scope.personalDetail = item
			}
		})
		console.log(

			'人选详情',$scope.personalDetail
		)
		var personalDetailAlert = $(".personalDetailAlert").html()

		layer.open({
			title: '人选详情',
			content: personalDetailAlert,
		});
	}

	$scope.tjAdd=function(e,id){
		if($scope.loginInfos){
			layer.open({
				type: 1,
				title: false,
				closeBtn: 0,
				shadeClose: true,
				skin: '',
				area: 'auto',
				maxWidth :"auto",
				maxHeight : "auto",
				resize : false,
				content: $(".jobsNewAlert"),
			});
			console.log(e);
			console.log('职位id',id)
			$scope.chooseId = id
			e.stopPropagation();
			e.preventDefault();
			}
			else{
				layer.open({     
					type: 1,
					title: false,
					closeBtn: 0,
					shadeClose: true,
					skin: '',
					area: 'auto',
					maxWidth :"auto",
					maxHeight : "auto",
					resize : false,
					content: $(".lay-sign"),
				});
			}
	}


	$scope.tdscarch = {
		personId: ''
	}; 


	$scope.ypAdd=function(id, pid){
		$scope.tdscarch.proId = id;
		$scope.tdscarch.userId = window.localStorage.getItem('userId');

		console.log('数组',$scope.selectCvAll);

		console.log('两个id',id, pid)
		var perIdAry = [],perIdsJoin = '';
		for(var k in pid){
			perIdAry.push(pid[k].perId)
		}
		$scope.tdscarch._id = id
		perIdsJoin = perIdAry.join()
		if($scope.loginInfos){
			if($scope.selectCvAll && $scope.selectCvAll.length > 1){
				$scope.tdscarch.personId = $scope.selectCvAll[0].personId;
				var param = "proId="+id+"&perIds="+perIdsJoin
				personService.addPersonPush(param).success(
				function (response) {
					var resultMsg = JSON.parse(response.obj)
					layer.msg(resultMsg.content);
				}
			)
			}else{
				layer.open({
					type: 1,
					title: false,
					closeBtn: 0,
					shadeClose: true,
					skin: '',
					area: 'auto',
					maxWidth :"auto",
					maxHeight : "auto",
					resize : false,
					content: $(".selectCv"),
				});
			}
		} else {
			layer.open({     
				type: 1,
				title: false,
				closeBtn: 0,
				shadeClose: true,
				skin: '',
				area: 'auto',
				maxWidth :"auto",
				maxHeight : "auto",
				resize : false,
				content: $(".lay-sign"),
			});
		}
		
	}
	$scope.selectCvId = function(id){
		$scope.tdscarch.personId = id;
		
	}
	$scope.selectCvSave = function(){
		$scope.tdscarch._id,$scope.tdscarch.personId
		personService.proVisitorNum($scope.tdscarch._id,$scope.tdscarch.personId).success(
			function (response) {
				layer.msg("投递成功");
			}
		)
	}
	$scope.nowIndustry = function($event){
		$($event.target).addClass("on").siblings('li').removeClass("on");
		// console.log($event.target)
		let industryInputItem = document.querySelector('.industry-input-item .now-industry');
		console.log($event);
		industryInputItem.value = $event.target.innerHTML;
		$scope.recommend.currentIndustry = industryInputItem.value
	}
	$scope.dealRouesubway = function(){
		$scope.initData.rouesubway.forEach(element => {
			element.lineName = getCaption(element.lineName, 0)
		});
	}
	// 选择城市
	$scope.selectCity = function(item,index) {
		// $scope.index = index;
		// console.log($scope.index)
		// console.log(item)
		
		if(item.children && item.children[0].name=="市辖区"){
			// console.log(1)
			$scope.initData.provinceList=item.children[0].children;
			// console.log($scope.initData.provinceList)
		}else{
			// console.log(item.children)
			$scope.initData.provinceList=item.children;
			// console.log($scope.initData.provinceList)
		}
			// console.log(item)
			var city = item.children;
			var type = $scope.initData.cityType;
			console.log(type,"502")
			if (!index) {
				$('.cityPageBtn  ').css('display', 'none')
				$('.city').css('display', 'none')
				$('.metro').css('display', 'none')
				$('.metroList').css('display', 'none');
				console.log("55555")
			} else {
				$('.cityPageBtn').css('display', 'flex')
				if (type) {
					// 市区
					console.log("999999")
					$('.city').css('display', 'flex')
					$('.metro').css('display', 'none')
					$('.cityPageBtn .onselect').removeClass('on');
					$('.cityPageBtn .onselectw').addClass('on')
				} else {
					// 地铁线
					// debugger;
					console.log("00000")
					$('.metro').css('display', 'flex')
					$('.city').css('display', 'none')
					$('.cityPageBtn .onselectw').removeClass('on');
					$('.cityPageBtn .onselect').addClass('on')
				}
			}
			if ($scope.initData.cityCurrent == index) {
				$scope.initData.cityCurrent = null
				$scope.select.address = ''
				$('.city').css('display', 'none')
				$('.metro').css('display', 'none')
				$('.metroList').css('display', 'none')
				$('.cityPageBtn').css('display', 'none')
			} else {
				$scope.initData.cityCurrent = index
				$scope.select.address = item.name
			}
			$scope.select.lineNum = ''
			$scope.initData.lineCurrent = null
			$scope.select.lineAdrs = ''
			$scope.initData.lineadrsCurrent = null
			$scope.select.province = ''
			$scope.initData.provinceCurrent = null
			// console.log(	$scope.select,"111")
			$scope.search(1, 10)
		}
	// 选择职能
	$scope.selectJob = function (index) {
		// console.log($scope.initData.jobList[index]);
		var job = $scope.initData.jobList[index];
		if ($scope.initData.jobCurrent == index && job.length == 0) {
			$scope.initData.jobCurrent = null
			$scope.select.job = ''
			// console.log($scope.select)
		} else {
			if (job.list.length > 0) {
				$scope.initData.jobCurrent = index
				// $scope.select.job = job
			} else {
				$scope.initData.jobCurrent = index
				$scope.select.job = job.name
				$scope.search(1, 10)
			}
		}
	}
	$scope.selectJobItem = function (index) {
		if ($scope.initData.jobListCurrent == index) {
			$scope.initData.jobListCurrent = null
			$scope.select.job = ''
		} else {
			$scope.initData.jobListCurrent = index
			var jobItem = $scope.initData.jobList[$scope.initData.jobCurrent];
			var job = jobItem.name + ' ' + jobItem.list[index].name;
			$scope.select.job = job
		}
		$scope.search(1, 10)
	}
	// 选择年薪
	$scope.recommends = [];
	$scope.selectGongzi = function (index) {
        var gongzi = $scope.initData.deptList[index];
        if ($scope.initData.deptCurrent == index) {
            $scope.initData.deptCurrent = index
            $scope.select.gongzi = ''
        } else {
            if($scope.select.gongzi == ''){
                $scope.initData.deptCurrent = null
                $scope.select.gongzi = gongzi
            }else{
                $scope.initData.deptCurrent = null
                $scope.select.gongzi = ''
            }
        }
        $scope.search(1, 10)
    }
	// 订阅
	$scope.subscribe = function () {
		console.log('1111122222',$scope.loginInfos)
		if($scope.loginInfos == true){
			if ($(".Subscribe button").text() == "订阅") {
				if ($scope.initData.subscribe.hopeIndustry != '') {
					$(".Subscribe button").text("取消订阅");
					$scope.flag=true
					$('.jobs .allJobs .tops h1 .fasta').addClass("on").siblings('.jobs .allJobs .tops h1 span').removeClass("on");
					console.log('期望职位',typeof($scope.initData.subscribe.hopeIndustry))
					var hopeIndustry = $scope.initData.subscribe.hopeIndustry
					$scope.initData.subscribe.hopeIndustry = hopeIndustry.trim().split(/\s+/);
					yingpinService.addcollectionsation($scope.initData.subscribe).success(function(response){
						console.log(response)
						layer.msg('订阅成功')
					})
				}
			} else {
				$('.jobs .allJobs .tops h1 .faskk').addClass("on").siblings('.jobs .allJobs .tops h1 span').removeClass("on");
				$scope.flag=false
				$(".Subscribe input").val("");
				$scope.initData.subscribe = {};
				$scope.initData.subscribe.hopeIndustry = [];
				$scope.list=[]
				$(".Subscribe button").text("订阅");
				$($event.target).addClass("on");
				// yingpinService.collectionsation($scope.initData.subscribe).success(function(response){
				// 	console.log(response)
				// })
	
			}
		}else{
			layer.open({     
				type: 1,
				title: false,
				closeBtn: 0,
				shadeClose: true,
				skin: '',
				area: 'auto',
				maxWidth :"auto",
				maxHeight : "auto",
				resize : false,
				content: $(".lay-sign"),
			});
		}
	}
	// 查询分页
	$scope.findPage = function (page, rows) {
		yingpinService.findPage(page, rows).success(
			// console.log(proName),
			function (response) {
				$scope.list = response.rows;
				console.log(response.rows);
				$scope.paginationConf.totalItems = response.total; // 更新总记录数
			}
		)
	}
	// 新增或者更新
	$scope.save = function () {
		var object;
		if ($scope.entity.id == null) {
			object = yingpinService.save($scope.entity);
		} else {
			object = yingpinService.update($scope.entity);
		}
		object.success(
			function (response) {
				if (response.success) {
					// console.log(response);
					$scope.reloadList();
				} else {
					// console.log(response.message);
				}
			}
		)
	}
	// 查询单个
	$scope.findOne = function (id) {
		yingpinService.findOne(id).success(function (response) {
			$scope.entity = response;
		})
	}
	// 删除
	$scope.dele = function () {
		// 获取选中的复选框
		yingpinService.dele($scope.selectIds).success(
			function (response) {
				if (response.success) {
					$scope.reloadList(); // 刷新列表
				}
			}
		);
	}
	// 对象浅拷贝
	function shallowCopy(src) {
		var dst = {};
		for (var prop in src) {
			if (src.hasOwnProperty(prop)) {
				dst[prop] = src[prop];
			}
		}
		return dst;
	}
	// 搜索
	$scope.searchEntity = [];
	$scope.jobList = [];


	$scope.search = function (page, rows,proName) {

		if (page && rows) {
			if($scope.select.proName != ''){
				$scope.select.proName=proName;
			}
			if($scope.select.subwaystation != ''){
				$scope.select.subwaystation=$scope.initData.lineadrsList.stepName;
			}

			for(var element in $scope.select){
				if($scope.select[element]==""){
					delete $scope.select[element];
					// $scope.select.splice(element,1)
				}
			}
			console.log('筛选条件',$scope.select)

			var param = shallowCopy($scope.select)

			var list = $scope.initData.degreeList
			for(var i = 0 ; i < list.length ; i++){
				if(list[i].name == $scope.initData.degreeName){
					param.firstDegree = list[i].value
					

				}
			}

			console.log('前数组',$scope.select)
			console.log('后数组',param)
			$scope.list = []


			yingpinService.search(page,rows, param).success(function (response) {
				console.log(response.obj)
				if(response.obj!=null){
					$scope.list = response.obj.rows;
					$scope.jobList = response.obj.rows;
					$scope.totalRows = response.obj.total;
					$scope.paginationConf.totalItems = response.obj.total; // 更新总记录数
				}
			
				// $scope.addhref='职位-职位详情页.html?id='+response.obj.id+'+&projectVistiNum='+response.obj.projectVistiNum
			})
		} else {
			var param = shallowCopy($scope.select)

			var list = $scope.initData.degreeList
			for(var i = 0 ; i < list.length ; i++){
				if(list[i].name == $scope.initData.degreeName){
					param.firstDegree = list[i].value
				}
			}

			console.log('前数组',$scope.select)
			console.log('后数组',param)
			yingpinService.search(1, 10, param).success(function (response) {
				$scope.list = response.obj.rows;
				// console.log(response,"response")
				$scope.totalRows = response.obj.total;
				$scope.paginationConf.totalItems = response.obj.total; // 更新总记录数
			})
		}

	}
	$scope.collectionStationList = [];
	$scope.collectionStationCount = 0;
	$scope.collectionStationFindAll = function () {
		collectionStationService.findAll().success(function (response) {
			$scope.collectionStationList = response.obj;
			$scope.collectionStationCount = response.obj;
			
		})
	}
	// $scope.collectionStationProjectFindAll = function() {
	// 	collectionStationService.projectFindAll().success( function (response) {
	// 		console.log(response);
	// 		// debugger;
	// 	})
	// }


	$scope.hotStationList = [];
	$scope.findHotStationList = function () {
		collectionStationService.findHotStationList().success(function (response) {
			// $scope.hotStationList = response.obj;
			// console.log(JSON.parse(response.obj))
			$scope.hotStationList = JSON.parse(response.obj);
		})
	}
	$scope.reloadList = function () {
		//切换页码
		$scope.search($scope.paginationConf.currentPage,
			$scope.paginationConf.itemsPerPage);
	}
	//分页控件配置
	$scope.paginationConf = {
		currentPage: 1,
		totalItems: 10,
		itemsPerPage: 10,
		perPageOptions: [10, 20, 30, 40, 50],
		onChange: function () {
			$scope.reloadList(); //重新加载
		}
	};
	$scope.selectIds = []; //选中的ID集合
	//更新复选
	$scope.updateSelection = function ($event, id) {
		if ($event.target.checked) { //如果是被选中,则增加到数组
			$scope.selectIds.push(id);
		} else {
			var idx = $scope.selectIds.indexOf(id);
			$scope.selectIds.splice(idx, 1); //删除
		}
	}
	$scope.recommendData = []; //选中的ID集合

	$scope.recommend = {
		// entitydata.personId = Math.ceil(Math.random()*10000);
        chineseName  : "",
          personName  : "" ,
          phone  : [] ,
          headportrait  : "" ,
          gender  : "" ,
          city  : "" ,
          birthday  : "" ,
          recentUnit  : "" ,
          qualification  : "" ,
          recentPosition  : "" ,
         personState  : "" ,
         incumbency  : "" ,
         industry  : "" ,
         timetype  : "" ,
         expyearsal  : "" ,
         hopeIndustry  : "" ,
         household  : "" ,
         houseProject  : "" ,
         email  : [] ,
         height  : "" ,
         country  : "" ,
         jobLeavl  : "" ,
         origin  : "" ,
         curyearsal  : "" ,
         politics  : "" ,
         highlyEducated  : "" ,
         maritalStatus  : "" ,
         certtype  : "" ,
         overseasExperience  : "" ,
         certcode  : "" ,
         coverletter  : [] ,
         familymember  : [] ,
         resume  : [] ,
         languageExp  : [{
            languageType:'',
            languageLevel:''
        }] ,
             eduBackground  : [{
                eduStartTime:'',
                eduEndTime:'',
                soFar:'',
                eduType:'',
                eduSchoolName:'',
                eduValue:{
                    // 专业名称
                    '572266df-2bd8-4a46-be10-fd5f595bc4c4':'',
                    // 是否统招
                    '8ad30b5b-dfaa-43ba-8968-7535eccc28c8':'',
                    // 学历/学位
                    '0b8b0f62-7d06-4b2f-8ef7-6ad703d9d67b':''
                }
            }] ,
             projectExp  : [
                {
                    proIntoTime:'',
                    proOutTime:'',
                    sofar:'',
                    proName:'',
                    projectExpValue:{
                        '77a7441a-23b4-4b7c-aa2c-269185db1c33':'',
                        '238926b5-bf7f-4b88-b7fb-ce1c9caf234c':'',
                        'e56dbbc6-a86b-437d-9de5-241929df991a':'',
                        'dbf1b67f-ac70-495a-be14-aaf08daa8bfd':'',
                        '7099a588-7dd1-4fa7-aed5-64f096e618dc':''
                    },
                    path:'',
                    yPath:'',
                    kPath:'',
                    cos:'',
                    proDescription:''
                }
            ] ,
             workExp  : [
                {
                    workStartTime:'',
                    workEndTime:'',
                    workComname:'',
                    workExpValue:{
                        'ddf4afda-9f15-41fd-ae1d-38bfcc50fc44':'',
                        'efdd270f-fac2-46be-9a96-6990b919f78e':'',
                        'fb894fdb-8ae6-4f72-807c-c8476c7543cb':'',
                        '815374f3-5cb7-48dd-8783-52308a7c8217':''
                    },
                    mainDuty:'',
                    workBussdesc:'',
                    exitText:''
                }
            ] ,
             majorQualify  : [{
                papersName:'',
                getTime:'',
                issuingAgency:''
            }] ,
         personalfile  : [] ,
         note  : [] ,
         headportrait  : [] ,
	}

	//保存简历信息
	// $scope.newCandidates={}
	$scope.saveRecommend = function () {
		layui.use('form', function(){
			var form = layui.form;
			//监听提交
			form.on('submit(formRecommend)', function(data){
				$scope.recommend.gender = data.field.gender
				$scope.recommend.incumbency = $(".jobsNewAlert .new .layui-form input.functions").val()
				recommendService.saveRecommend($scope.recommend).success(function (response) {
					if (response.success == true) {
						$scope.recommends.push(response.obj);
						console.log($scope.recommends);
						// window.location.reload();
						layer.msg(response.message)
						window.location.reload();
					} else {
						layer.msg(response.message)
					}
				})
			});
		});
		
	}

	//确认推荐saveRecommendadd
	$scope.saveRecommendadd = function () {
		layui.use('form', function(){
			var form = layui.form;
			//监听提交
			form.on('radio(recommendsMan)', function(data){
				console.log(data.elem); //得到radio原始DOM对象
				console.log(data.value); //被点击的radio的value值
				});  
			form.on('submit(recommendsManForm)', function(data){
				console.log('推荐人',data.field)
				var param =  {
					perIds: data.field.recommendsMan,
					proId: $scope.chooseId
				}
				recommendService.recommendPush(param).success(function (response) {
					if (response.success == true) {
						$scope.recommends.push(response.obj);
						console.log($scope.recommends);
						// window.location.reload();
						layer.msg(response.message)
						window.location.reload();
					} else {
						layer.msg(response.message)
					}
				})
			});
		});

		
		// // $scope.recommend.sex=$scope.initDate.recommend.gender;
		// console.log($scope.recommend,"111")
		// recommendService.selectPersonProject(1,10,$scope.recommend).success(function (response) {
		// 	console.log(response)
		// 	// if (response.success) {
		// 	// 	$scope.recommends.push(JSON.parse(response.obj));
		// 	// 	console.log($scope.recommends);
		// 	// 	// window.location.reload();
		// 	// }
		// })
	}
	//获取所有的简历
	$scope.selectCvAllFn = function(){
		recommendService.getRecommendList().success(function (response) {
			if (response.success) {
				$scope.selectCvAll = response.obj;
				$scope.recommends = response.obj;
				//console.log($scope.selectCvAll);
				layui.use(['form'], function(){
						var form = layui.form;
						setTimeout(() => {
							form.render();
						},0);
				});
			}
		})
	}

	// 赚
	$scope.zhuan = function($event){
		$event.stopPropagation();//阻止冒泡
      	$event.preventDefault();// 阻止默认行为 
		if($scope.loginInfos == true){
			window.location.href = "http://39.96.49.139/outside/index/frontPage.jsp";
		}else{
			layer.open({     
				type: 1,
				title: false,
				closeBtn: 0,
				shadeClose: true,
				skin: '',
				area: 'auto',
				maxWidth :"auto",
				maxHeight : "auto",
				resize : false,
				content: $(".lay-sign"),
			});
		}
	}
	// 收藏职位
	$scope.addperfavpro = function (proid, $event) {
		console.log('$scope.loginInfos',proid, $scope.loginInfos)
		if($scope.loginInfos == true){
			if(!$($event.target).hasClass("on")){
				$($event.target).addClass("on");
				layer.msg("收藏成功");
				var param = {
					"proId":proid._id,
					"proName":proid.proName,
					"minSalary":proid.release.minSalary,
					"maxSalary":proid.release.maxSalary,
					// areaData
					"city":proid.release.city,
					"minLimit":proid.release.minLimit,
					"maxLimit":proid.release.maxLimit,
					// eduCation
					"firstDegree":proid.release.firstDegree,
					//sexDate
					"gender":proid.release.gender,
					"estimateHeadhuntingFee":proid.release.estimateHeadhuntingFee,
					"visitNumber":proid.projectVistiNum,
				}
				yingpinService.addcollectionsation(param).success(function(response){
					$scope.collectionStationFindAll()
					console.log(response)
				})
			}else{
				$($event.target).removeClass("on");

				
				console.log(proid.$$hashKey)
				// $scope.collectionStationCount.forEach(element=>{
				// 	console.log(element.$$hashKey)
				// 	console.log(element.$$hashKey==proid.$$hashKey)
					
				// 	if(element.$$hashKey==proid.$$hashKey){
				// 			yingpinService.collectionsation(proid._id).success(function(response){
				// 			console.log(response)
				// 			$scope.collectionStationFindAll()
				// 		})
						
				// 	}
				// })
				yingpinService.collectionsation(proid._id).success(function(response){
					console.log(response)
					$scope.collectionStationFindAll()
				})
				console.log(proid)
				$($event.target).removeClass("on");
			
				layer.msg("取消收藏");
				
			}
		}else{
			layer.open({     
				type: 1,
				title: false,
				closeBtn: 0,
				shadeClose: true,
				skin: '',
				area: 'auto',
				maxWidth :"auto",
				maxHeight : "auto",
				resize : false,
				content: $(".lay-sign"),
			});
		}
	}

	$scope.hasHopeList = false
	$scope.hopeList = []

	$scope.getHopeList = function(){
		yingpinService.findAllHopeList().success(function(res){
			if(res.success == true){
				if( res.obj.length>0){
					$scope.hasHopeList = true
					$scope.hopeList = res.obj
					}
			}
		})
	}

	// 切换为订阅列表
	$scope.changeHopeList = function(){
		$scope.list = []
		$scope.list = $scope.hopeList

	}

	// 切换全部职业列表
	$scope.allJob = function(){
		$scope.list = []
		$scope.list = $scope.jobList
	}


	/**
	 * 是否登录
	 */
	$scope.loginInfos = false;
	$scope.loginInfo = function () {
		usersService.getIsLogin().success(function (response) {
			if (response.success) {
				$scope.loginInfos = response.obj
				if ($scope.loginInfos) {
					$(".hots-list").hide();
					$(".collectionJobs-list").show();
				} else {
					$(".hots-list").show();
					$(".collectionJobs-list").hide();
				}
			}
		})

	}

})