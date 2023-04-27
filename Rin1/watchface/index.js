const IMG = 'images/'
const DW = 192
const DH = 490
const T_WIDTH = 72
const T_HEIGHT = 94
const T_SPACE = 2

const S_WIDTH = 70
const S_HEIGHT = 17
const S_SPACE = 6
const PROGRESS_TH = 22
const PROGRESS_R = (DW-PROGRESS_TH)/2-5
const P_START = 90
const P_END = 10
const P_DISABLED = 0.3
const PROGRESSES = [
    [DW/2, DW/2, -P_START, -P_END, 0],
    [DW/2, DW/2, P_START, P_END, 1],
    [DW/2, DH-DW/2, -P_START, P_END-180, 3],
    [DW/2, DH-DW/2, P_START, 180-P_END, 4]
]

const EDIT_TYPES = [
    hmUI.data_type.STEP,
    hmUI.data_type.CAL,
    hmUI.data_type.HEART,
    hmUI.data_type.PAI_WEEKLY,
    hmUI.data_type.BATTERY
]
const DEFAULTS_ORDER = [0, 1, 3, 4]

const I_DIR = IMG+'icons/'
const IL_DIR = IMG+'icons_l/'
const EDITS = [
    ['step.png', 0xffd801],
    ['cal.png',  0xff8a00],
    ['heart.png', 0xf82010],
    ['pai.png', 0x5252ff],
    ['battery.png', 0x02fa7a]
]
const I_SIZE = 20
const IL_SIZE = 30
const I_SPACE_H = 3
const I_SPACE_V = 10

const EDIT_GROUP_PROP = {
    tips_BG: IMG+'nothing.png',
    tips_x: 0,
    tips_y: 0,
    tips_width: 110
}

const C_SIZE = 70
const C1_DEFAULT = hmUI.data_type.HEART
const C2_DEFAULT = hmUI.data_type.WEATHER
const C_POS = [DH-DW/2-5, PROGRESS_TH+10]

const W_SIZE = 40

const S_I_SIZE = 16
const S_I_SPACE = 10

const timeNums = []
for (let i = 0; i < 10; i++) {
    timeNums.push(`${IMG}time_numbers/${i}.png`)
}
const dayNames = []
for (let i = 1; i <= 7; i++) {
    dayNames.push(`${IMG}days/${i}.png`)
}
const statNums = []
for (let i = 0; i < 10; i++) {
    statNums.push(`${IMG}status_numbers/${i}.png`)
}
const statSlash = IMG+'status_numbers/slash.png'
const statInvalid = IMG+'status_numbers/dashes.png'

const wNums = []
for (let i = 0; i < 10; i++) {
    wNums.push(`${IMG}weather_numbers/w${i}.png`)
}
const wMinus = IMG+'weather_numbers/minus.png'
const wDegree = IMG+'weather_numbers/degree.png'

const weathers = []
for (let i = 1; i < 26; i++) {
    weathers.push(`${IMG}weather/${i}.png`)
}
for (let i = 0; i < 4; i++) {
    weathers.push(IMG+'nothing.png')
}

function setBrightness(c, b) {
    let blue = c % 256
    let green = Math.floor(c/256) % 256
    let red = Math.floor(c/256/256) % 256
    return Math.floor(red*b)*256*256 + Math.floor(green*b)*256 + Math.floor(blue*b)
}

WatchFace({
    initView() {
        console.log('index page.js on build invoke')
        hmUI.createWidget(hmUI.widget.IMG, {
            x: 0,
            y: 0,
            src: IMG+ "bg/bg.png"
        });

        //// Make groups
        //function makeEditGroup(props) {
        //    return hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, props)
        //}

        //let opt_types = []
        //for (let [i, t] of EDIT_TYPES.entries()) {
        //    opt_types.push({
        //        type: t,
        //        preview: IL_DIR+EDITS[i][0]
        //    })
        //}
        //let c_opt_types = [
        //    ...opt_types,
        //    {
        //        type: hmUI.data_type.WEATHER,
        //        preview: IL_DIR+'weather.png'
        //    }
        //]
        //let groups = []
        //for (let i of PROGRESSES.keys()) {
        //    groups.push(makeEditGroup({
        //        edit_id: 101+i,
        //        x: [0, DW/2][i % 2],
        //        y: [0, DH-DW/2][Math.floor(i/2) % 2],
        //        w: DW/2,
        //        h: DW/2,
        //        select_image: IMG+'masks/select.png',
        //        un_select_image: IMG+'masks/unselect.png',
        //        default_type: EDIT_TYPES[DEFAULTS_ORDER[i]],
        //        optional_types: opt_types,
        //        count: opt_types.length,
        //        ...EDIT_GROUP_PROP
        //    }))
        //}
        //const centerInfo = {
        //    x: (DW-C_SIZE)/2,
        //    w: C_SIZE,
        //    h: C_SIZE,
        //    select_image: IMG+'masks/select-c.png',
        //    un_select_image: IMG+'masks/unselect-c.png',
        //    optional_types: c_opt_types,
        //    count: c_opt_types.length,
        //    ...EDIT_GROUP_PROP
        //}
        //let centerGroup1 = makeEditGroup({
        //    edit_id: 110,
        //    y: C_POS[0]-C_SIZE,
        //    default_type: C1_DEFAULT,
        //    ...centerInfo
        //})
        //let centerGroup2 = makeEditGroup({
        //    edit_id: 111,
        //    y: C_POS[1]+C_SIZE,
        //    default_type: C2_DEFAULT,
        //    ...centerInfo
        //})

        //const dateline = DH/2+T_HEIGHT+T_SPACE/2+12
        // Time
        let timeW = hmUI.createWidget(hmUI.widget.IMG_TIME, {
            hour_zero: 1,
            hour_startX: 5,
            hour_startY: 315,
            hour_align: hmUI.align.CENTER_H,
            hour_array: timeNums,
            hour_space: T_SPACE,

            minute_zero: 1,
            minute_startX: 105,
            minute_startY: 315,
            minute_align: hmUI.align.CENTER_H,
            minute_array: timeNums,
            minute_space: T_SPACE,

            //second_zero: 1,
            //second_startX: 160,
            //second_startY: 390,
            //second_align: hmUI.align.CENTER_H,
            //second_array: statNums,
            //second_space: 3,

            show_level: hmUI.show_level.ONLY_NORMAL
        })

        // Weekday
        let weekW = hmUI.createWidget(hmUI.widget.IMG_WEEK, {
            x: 119,
            y: 413,
            week_en: dayNames,
            week_tc: dayNames,
            week_sc: dayNames,
            show_level: hmUI.show_level.ONLY_NORMAL
        })

        // Date
        hmUI.createWidget(hmUI.widget.IMG_DATE, {
            year_startX: 10,
            year_startY: 386,
            year_space: -8, // Spacing of text.
            year_zero: 1, // Whether to make up zeroes.
            year_en_array: statNums,
            year_sc_array: statNums,
            year_tc_array: statNums,
            year_is_character: true,

            month_startX: 86,
            month_startY: 386,
            month_zero: 1,
            month_space: -7,
            month_en_array: statNums,
            month_sc_array: statNums,
            month_tc_array: statNums,

            day_startX: 136,
            day_startY: 386,
            day_zero: 1,
            day_space: -7,
            day_en_array: statNums,
            day_sc_array: statNums,
            day_tc_array: statNums,

            show_level: hmUI.show_level.ONLY_NORMAL
        })
        
        //Weather
       hmUI.createWidget(hmUI.widget.IMG_LEVEL, { // icon
            x: 50,
            y: 415,
            image_array: weathers,
            image_length: weathers.length,
            type: hmUI.data_type.WEATHER,
            show_level: hmUI.show_level.ONLY_NORMAL
        })

        // Center widgets
        //function makeWidget(cType, current_y) {
        //    // Center widget
        //    hmUI.createWidget(hmUI.widget.IMG, { // icon
        //        x: (DW-IL_SIZE)/2,
        //        y: current_y,
        //        src: IL_DIR+EDITS[EDIT_TYPES.indexOf(cType)][0],
        //        show_level: hmUI.show_level.ONLY_NORMAL
        //    })
        //    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
        //        x: 0,
        //        y: current_y+IL_SIZE+I_SPACE_V,
        //        w: DW,
        //        align_h: hmUI.align.CENTER_H,
        //        h_space: 2,
        //        font_array: wNums,
        //        type: cType,
        //        show_level: hmUI.show_level.ONLY_NORMAL
        //    })
        //    hmUI.createWidget(hmUI.widget.IMG_CLICK, {
        //        x: (DW-IL_SIZE)/2,
        //        y: current_y,
        //        w: IL_SIZE,
        //        h: IL_SIZE+I_SPACE_V+20,
        //        type: cType
        //    })
        //}
        //function makeWeather(current_y) {
            // Weather
            //hmUI.createWidget(hmUI.widget.TEXT_IMG, { // temperature
            //    x: 0,
            //    y: current_y+W_SIZE+I_SPACE_V,
            //    w: DW,
            //    align_h: hmUI.align.CENTER_H,
            //    h_space: 2,
            //    font_array: wNums,
            //    negative_image: wMinus,
            //    unit_sc: wDegree,
            //    unit_en: wDegree,
            //    unit_tc: wDegree,
            //    type: hmUI.data_type.WEATHER_CURRENT,
            //    show_level: hmUI.show_level.ONLY_NORMAL
            //})
            //hmUI.createWidget(hmUI.widget.IMG_CLICK, {
            //    x: (DW-W_SIZE)/2,
            //    y: current_y,
            //    w: W_SIZE,
            //    h: W_SIZE+I_SPACE_V+20,
            //    type: hmUI.data_type.WEATHER
            //})
        //}
        let cTypes = [
            centerGroup1.getProperty(hmUI.prop.CURRENT_TYPE),
            centerGroup2.getProperty(hmUI.prop.CURRENT_TYPE)
        ]
        for (let i in cTypes) {
            if (cTypes[i] === hmUI.data_type.WEATHER) {
                makeWeather(C_POS[i])
            } else {
                makeWidget(cTypes[i], C_POS[i])
            }
        }

        // Status
        hmUI.createWidget(hmUI.widget.IMG_STATUS, { // bluetooth
            x: 2,
            y: DH/2-S_I_SIZE-S_I_SPACE/2,
            type: hmUI.system_status.DISCONNECT,
            src: IMG+'bt0.png',
            show_level: hmUI.show_level.ONLY_NORMAL
        })
        hmUI.createWidget(hmUI.widget.IMG_STATUS, { // dnd
            x: 2,
            y: DH/2+S_I_SPACE/2,
            type: hmUI.system_status.DISTURB,
            src: IMG+'dnd1.png',
            show_level: hmUI.show_level.ONLY_NORMAL
        })
    },

    onInit() {
        console.log('index page.js on init invoke')
        this.initView()
    },

    build() {
        console.log('index page.js on build invoke')
        
    },

    onDestroy() {
        console.log('index page.js on destroy invoke')
    },
})
