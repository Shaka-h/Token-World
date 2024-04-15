<template>
    <div class="flex flex-col space-y-2"> 
        <div><span class="mr-2">*</span>Image</div>
        <div class="border rounded-lg items-center justify-center flex ">
            <input class=" h-32 p-2 border m-2" />
            <div class="border w-full p-3 m-3">image
                <div>Upload the image of your item</div>

            </div>
        </div>
    </div>
    <div class="mt-4">
        <div> 
            <div><span class="mr-2">*</span>Name</div>
            <div> 
                <input class="rounded-lg p-2 border"/>
            </div>

        </div>
    </div>
    <div class="mt-4"> 
        <div><span class="mr-2">*</span>Supply</div>
        <div> 
            <input class="rounded-lg p-2 border"/>
        </div>

    </div>
    <div class="mt-4"> 
        <div><span class="mr-2">*</span>Description</div>
        <div> 
            <input class="rounded-lg p-2 border"/>
        </div>
    </div>
    <div class="mt-4"> 
        <div><span class="mr-2">*</span>Attributes</div>
        <div class="ml-2 mt-2">Traits describe attributes of your item. They appear as filters inside your collection page and are also listed out inside your item page.</div>
        <div> 
            <div class="mt-2 ml-4">+ Add Attribute</div>
        </div>

    </div>

    <div class="flex justify-end mt-4">
        <div class="p-2 border bg-primary rounded-lg">Create</div>
    </div>
</template>