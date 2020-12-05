<template>
  <v-expansion-panel class="accordion-node">
    <v-expansion-panel-header>
      <div class="d-flex">
        <div class="d-flex flex-column">
          <span class="accordion-header-name">{{node.name}}</span>
          <span class="accordion-header-url">{{node.url}}</span>
        </div>
        <v-badge
          class="accordion-badge"
          left
          bordered
          dot
          inline
          :color="getColor"
        >
          <span class="text-uppercase accordion-status-text">{{ getStatusText }}</span>
        </v-badge> 
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div v-if="getCurrentBlocks.hasError" style="color: red;" class="accordion-block-text">
        NO CONTENT
      </div>
      <div v-else>
        <v-alert color="blue-grey lighten-5" v-for="item in getCurrentBlocks.data" :key="item.id">
          <span class="accordion-id-text">
            {{ ('00' + `${item.id}`).slice(-3) }}
          </span>
          <br>
          <span class="accordion-block-text">
            {{ item.attributes.data }}
          </span>
        </v-alert>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'node',
  props: {
    node: {
      url: String,
      online: Boolean,
      name: String,
      loading: Boolean,
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters(['getBlocks']),
    getCurrentBlocks() {
      return this.getBlocks.find(item => item.url === this.node.url);
    },
    getColor() {
      let badgeColor = '#Eb5757';

      if(this.node.online) {
        badgeColor = "#18cc55";
      }
      return badgeColor;
    },
    getStatusText() {
      let statusText = 'Loading';

      if(!this.node.loading) {
        if(this.node.online) {
          statusText = 'Online';
        } else {
          statusText = 'Offline';
        }
      }
      return statusText;
    }
  }
}
</script>

<style scoped>
  .accordion-badge {
    margin-left: auto;
    margin-right: 12px;
    margin-top: 1px;
  }
  .accordion-header-name {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.44px;
    color: #263238;
  }

  .accordion-header-url {
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    color: #263238;
    opacity: 0.54;
  }

  .accordion-status-text {
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 1.5px;
    color: #263238;
  }

  .accordion-id-text {
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 1.5px;
    color: #304FFE;
  }

  .accordion-block-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;

    /* identical to box height, or 143% */
    letter-spacing: 0.25px;

    /* Dark Color */
    color: #263238;
  }
</style>

<style>
  .accordion-node .v-expansion-panels--accordion {
    padding-bottom: 12px;
  }

  .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
    height: 6px;
    margin-top: 18px;
    width: 6px;
  }

  @media only screen and (max-width: 442px) {
    .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
      margin-top: 28px;
    }  
  }
</style>