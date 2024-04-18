<template>
  <div class="col-md-12" style="height: 100%">

    <div class="px-1 text-gray-600">
      <span v-if="required" class="text-danger text-3xl ">*</span>
      {{ $t(label) }}

    </div>

    <template v-if="selectedFiles.length">
      <div class="flex flex-row flex-wrap gap-5 " :class="!multipleFiles ? 'justify-center items-center': ''">
        <div
            v-for="(selectedFile,index) in selectedFiles" :key="index"
            class="imagePreviewWrapper transition delay-150 flex flex-col
            rounded-lg border border-dashed border-primary/80 relative"
            @mouseenter="triggerRemove({show: true, index})"
            @mouseleave="triggerRemove({show: false, index})"
            :style="{ 'background-image': `url(${selectedFile?.base64})` }">
          <div class="">
            <span class="text-center font-semibold my-1">{{ selectedFile?.name }}</span>
            <div class="w-full flex items-center justify-center" v-if="fileIsDocumentType(selectedFile.name)" style="height: 100%">
              <img :src="fetchDocumentIcon(selectedFile.name)" class="w-28 h-28"/>
            </div>
          </div>
          <div class="backdrop-blur absolute top-0 w-full flex items-center justify-center hidden"
               :id="`file_${uniqueName}_${index}`"
               @click="removeFile(index)"  style="height: 100%; background-color: rgba(13,12,34,0.05)">
            <svg-icon name="closeX" height="h-10" width="w-10" class="mr-1" color="#ff8c82" :stroke="true"></svg-icon>
          </div>
        </div>
        <div v-if="multipleFiles" class="border p-5 grow flex items-center justify-center
          text-center border-dashed my-3 cursor-pointer border-2 hover:bg-slate-100 text-gray-600 rounded"
             @drop="handleDrop" @dragover.prevent @click="$refs.file.click()" style="background-color: #f8fafc;">
          <!--          <icon name="PlusCircle" size="40"/>-->
          +
        </div>
      </div>
    </template>
    <div v-else
         class="col-md-12 items-center border p-4 flex flex-col text-center border-dashed my-3
        cursor-pointer border-2 hover:bg-slate-100 text-gray-600 rounded border-red-100 justify-center" style="height: 100%; background-color: #f8fafc;"
         @drop="allowDrop && handleDrop()"
         @dragover.prevent
         @click="$refs.file.click()"
    >
      <span>{{ $t('click') }} <span v-if="allowDrop">{{ $t('or') }} </span></span>
      <span v-if="allowDrop">{{ multipleFiles ? $t('dropMultipleFiles') : $t('dropSingleFile')  }}</span>
      <span>{{ $t('toUploadDocuments') }}</span>
    </div>
    <input type="file" style="display: none" ref="file" :accept="accept" :multiple="multipleFiles" @input="handleFileInput" />
  </div>
</template>

<script>
// import SvgIcon from './SvgIcon.vue';
import {uploadFile} from "@/interfaces/global.interface.js";
import SvgIcon from "@/components/shared/SvgIcon.vue";

export default {
  // components: { SvgIcon },
  name: "FormDragDrop",
  components: {SvgIcon},
  emits: ["files","remove-files", "inputValue"],
  props: {
    multipleFiles: {
      type: Boolean,
      default: true
    },
    allowDrop: {
      type: Boolean,
      default: true
    },
    clearFiles: {
      type: Boolean,
      default: true
    },
    accept: {
      type: Array,
      default: () => ['*']
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
    },
    showLabels: {
      type: Boolean
    },
    name: {
      type: String
    },
  },
  data() {
    return {
      selectedFiles: [],
    };
  },
  watch: {
    clearFiles(val) {
      if (!val) {
        this.$nextTick(() => {
          this.selectedFiles = []
        })
      }
    }
  },
  computed: {
    uniqueName() {
      return Math.round(Math.random(1, 1000) * 1000, 1000);
    }
  },
  methods: {
    async handleDrop(event) {
      event.preventDefault();
      // Do something with the dropped files
      let {files} = event.dataTransfer
      let updatedFileList = []
      for(let file of files) {
        let uploadResult = files.length ? await uploadFile(file) : null
        updatedFileList.push({
          file: file,
          uploadResult
        })
      }
      if (updatedFileList) {
        this.showFiles(updatedFileList)
      }
    },
    async handleFileInput () {
      let {files} = this.$refs.file
      // let result = this.uploadFile(files)
      let updatedFileList = []
      for(let file of files) {
        let uploadResult = files.length ? await uploadFile(file) : null
        updatedFileList.push({
          file: file,
          uploadResult
        })
      }
      if (updatedFileList) {
        this.showFiles(updatedFileList)
      }
    },
    showFiles(files) {
      for(let file of files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFiles.push( {base64: e.target.result, name: file?.file?.name} )
        }
        if(reader.DONE) {
          reader.readAsDataURL(file.file)
        }
      }
      let inputValue = {}
      inputValue[this.name] = files.map(file => {
        return {
          attachmentName: file.uploadResult?.fileName,
          attachmentPath: file.uploadResult?.fullFileName,
        }
      })
      this.$emit('inputValue', inputValue)
    },
    removeFile(fileIndex) {
      this.selectedFiles.splice(fileIndex, 1)
      this.$emit("remove-files", fileIndex)
    },
    fileIsDocumentType(name) {
      let ext = name?.split('.')[1]
      return ['pdf','doc','docx','odt','ppt','pptx','odp','xls','xlsx','ods'].includes(ext?.toLowerCase());
    },
    fetchDocumentIcon(name) {
      let ext = name?.split('.')[1];
      switch(ext?.toLowerCase()) {
        case 'pdf' : return "/docs/pdf-icon.png";
        case 'doc' : case 'docx': case 'odt' : return "/docs/ppt-icon.png";
        case 'ppt' : case 'pptx': case 'odp' : return "/docs/word-icon.png";
        case 'xls' : case 'xlsx': case 'ods' : return "/docs/xls-icon.png";
        default    : return "/docs/text-icon.jpg";
      }
    },
    triggerRemove(evt) {
      let file = document.getElementById(`file_${this.uniqueName}_${evt.index}`)
      evt.show ? file.classList.remove('hidden') : file.classList.add('hidden')
    }
  },
};
</script>

<style scoped>
.dropzone {
  border: 2px dashed gray;
  padding: 20px;
}

.dropzone.dragover {
  border-color: green;
}

.dropzone.dropped {
  border-color: blue;
}
.imagePreviewWrapper {
  min-width: 250px;
  width: auto;
  height: 250px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
</style>
