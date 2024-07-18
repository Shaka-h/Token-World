import {notifyError, notifySuccess} from "@/services/notificationService.js";
import addMetadata  from '@/scripts/IPFS'


export const patchFormFields = (formFields, defaultValues) => {
    return formFields.map(field => {
        let fieldModified = {
            ...field
        }
        if (defaultValues?.id) {
            if (field?.inputType === 'input' || field?.inputType === 'textarea' || field?.inputType === 'rich-text' || field?.inputType === 'radio-group') {
                fieldModified.value = defaultValues[field?.name]
                console.log(defaultValues[field?.name])
                console.log(field?.name)
                if (field.disable){
                    fieldModified.disable = true
                }
            }
            else if (field?.inputType === 'checkbox') {
                fieldModified.value = defaultValues[field?.name]
                if (field.disable){
                    fieldModified.disable = true
                }
            }
            else if (field?.inputType === 'select') {
                let key = Object.keys(defaultValues[field?.defaultName]).find(key => key.toLowerCase().includes('uniqueid'))
                if (key) {
                    fieldModified.value = defaultValues[field?.defaultName][key]
                } else {
                    fieldModified.value = defaultValues[field?.defaultName]
                }
            } else if (field?.inputType === 'multi-select') {
                fieldModified.value = []
                for (const defaultValue of defaultValues[field?.defaultName]) {
                    let key = Object.keys(defaultValue).find(key => key.toLowerCase().includes('name'))

                    if (key) {
                        fieldModified.value.push(defaultValue[key])
                    } else {
                        fieldModified.value.push(defaultValue[field?.defaultName])
                    }
                }
            } else if (field?.inputType === 'time') {
                let timeValue = { HH: '00', mm: '00' }
                let time = defaultValues[field?.name].split(':')
                if (time.length === 2 || time.length === 3) {
                    timeValue.HH = time[0]
                    timeValue.mm = time[1]
                }
                fieldModified.value = timeValue
            } 
            // else if (field?.inputType === 'form-array') {
            //     fieldModified.value = []
            //     for (const defaultValue of defaultValues[field?.children]) {
            //         let key = Object.keys(defaultValue).find(key => key.toLowerCase().includes('name'))

            //         if (key) {
            //             fieldModified.value.push(defaultValue[key])
            //         } else {
            //             fieldModified.value.push(defaultValue[field?.children])
            //         }
            //     }
            // }
        } else {
            fieldModified.value = null
        }
        return fieldModified
    })
}



export const uploadFile = async (file) => {
    try {
        const logoString = await addMetadata(file);
        console.log('Logo uploaded to IPFS with CID:', logoString.toString());
        let result = logoString.toString();
        if (result) {
            notifySuccess("successfully uploaded file");
            return result;
        } else {
            console.log("error");
            notifyError("error");
        }
        return result;
    } catch (error) {
        notifyError(error);
        return;
    }
}
