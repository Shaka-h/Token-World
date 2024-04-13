<template>
  <div :id="iconId" v-html="getIcon(name)" v-bind:class="[width, height]">
  </div>
</template>

<script>
import { IconService } from "@/services/IconService";

export default {
  name: "SvgIcon",
  props: {
    width: String,
    height: String,
    color: {
      type: String,
      default: "#313131",
    },
    stroke: {
      type: Boolean,
      default: false,
    },
    override_color: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
    }
  },
  data() {
    return {
      IconService,
      iconId: `${Date.now()}${Math.floor(Math.random() * 100)}`
    };
  },
  methods: {
    getIcon(name = "system_settings") {
      let icon = IconService.email;
      Object.keys(IconService).forEach((key) => {
        if (key === name) icon = IconService[key];
      });
      return icon;
    }
  },
  created() {
    // prepare icon id attribute before rendering has occured
    this.iconId = this.name + "_" + this.iconId + "_" +Date.now();
  },
  mounted() {
    if (this.override_color && !this.stroke) {
      // Remove previous colors, width & height
      for (const element of document.getElementById(this.iconId).getElementsByTagName("svg")) {

        // element.removeAttribute("fill");
        element.removeAttribute("width")
        element.removeAttribute("height")

        for (const path of element.getElementsByTagName("path")) {
          path.removeAttribute("fill");
        }
      }
      // Set new Color
      let hasNoFillColor = document.getElementById(this.iconId).getElementsByTagName("svg")[0].getAttribute("fill") === 'none'
      if (!hasNoFillColor) {
        document.getElementById(this.iconId).getElementsByTagName("svg")[0].setAttribute("fill", this.color);
      } else {
        for (const element of document.getElementById(this.iconId).getElementsByTagName("svg")[0].getElementsByTagName('path')) {
          if (element.hasAttribute('stroke')) {
            element.setAttribute('stroke', this.color)
          }
        }
        for (const element of document.getElementById(this.iconId).getElementsByTagName("svg")[0].getElementsByTagName('g')) {
          if (element.hasAttribute('stroke')) {
            element.setAttribute('stroke', this.color)
          }
          if (element.hasAttribute('fill')) {
            element.setAttribute('fill', this.color)
          }
        }
      }
    } else if (this.override_color && this.stroke) {
      // Remove previous colors
      for (const element of document.getElementById(this.iconId).getElementsByTagName("svg")) {
        element.removeAttribute("stroke");
        for (const path of element.getElementsByTagName("path")) {
          path.removeAttribute("stroke");
        }
        // Some svgs have g tag with fill attribute
        for (const gTag of element.getElementsByTagName("g")) {
          gTag.setAttribute('fill', this.color)
        }
      }
      // Set new Color
      document.getElementById(this.iconId).getElementsByTagName("svg")[0].setAttribute("stroke", this.color);
    }
  }
};
</script>

