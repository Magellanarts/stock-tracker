import moment from 'moment'

export const numbers = {
  methods: {
    numberFormat(number, decimalPos, decimalSep, thousandSep) {
      const ts = thousandSep == null ? ',' : thousandSep
      const ds = decimalSep == null ? '.' : decimalSep
      const dp = decimalPos == null ? 2 : decimalPos
      const n = Math.abs(Math.floor(number)).toString()
      let i = n.length % 3
      let f = (number < 0 ? '-' : '') + n.substr(0, i)
      for (; i < n.length; i += 3) {
        if (i !== 0) f += ts
        f += n.substr(i, 3)
      }

      if (dp > 0)
        f +=
          ds +
          parseFloat(number)
            .toFixed(dp)
            .split('.')[1]

      return f
    }
  }
}

export const dates = {
  methods: {
    updateTime(time, format) {
      const day = moment(time)
      if (format) {
        return day.format(format)
      } else {
        return day.format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  }
}
