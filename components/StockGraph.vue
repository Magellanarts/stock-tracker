<script>
import { Line } from 'vue-chartjs'
import { numbers, dates } from '@/mixins/formatting'
export default {
  extends: Line,
  mixins: [numbers, dates],
  props: {
    snapshots: {
      type: Array,
      required: true
    }
  },
  mounted() {
    const localsnapshots = []
    const labels = []

    this.snapshots.forEach((snapshot) => {
      localsnapshots.push(parseFloat(snapshot.totalValue).toFixed(2))

      labels.push(this.updateTime(snapshot.timestamp, 'MM/D/YY'))
    })

    this.renderChart(
      {
        labels,
        datasets: [
          {
            label: 'Total Value',
            borderColor: '#f87979',
            data: localsnapshots
          }
        ]
      },
      {
        legend: {
          display: false
        }
      }
    )
  }
}
// TODO: add chart for each stock
</script>
