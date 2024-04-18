import {notifyError, notifySuccess} from "@/services/notificationService.js";
import {apolloClient} from "@/apollo.js";
import {uploadBase64File} from "@/graphql/uploadFile.graphql.js";


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
        } else {
            fieldModified.value = null
        }
        return fieldModified
    })
}

export const uploadFile = async (file, store) => {
    return new Promise((resolve, reject) => {
        if (file instanceof Object) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                let base64String = reader.result.split(",")[1];

                await apolloClient.mutate({
                    fetchPolicy: "no-cache",
                    mutation: uploadBase64File,
                    variables: {
                        input: {
                            fileName: file?.name,
                            base64String
                        }
                    }
                }).then(async (response) => {
                    let result = Object.values(response)[0];
                    result = Object.values(result)[0];
                    if (result?.response?.status) {
                        notifySuccess(result.response.message);
                        return result?.data;
                    } else {
                        notifyError(`${result.response.code}: ${result.response.message}`);
                    }
                    return result?.response?.status;
                }).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    notifyError(error);
                    reject(error);
                    return;
                });
            };

            reader.onerror = async (error) => {
                notifyError(error);
                reject(error);
                throw(error);
            };
        }
    });
}
