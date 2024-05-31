<script setup>

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['reload']);
function reload() {
    emit('reload');
}

</script>

<template>
    <div class="mb-3">
        Nombre total de <strong>{{ props.type }}</strong> : {{ props.total }}
    </div>
    <button @click="reload()" class="btn btn-primary" type="button">Reload</button>


</template>

<style scoped>
strong {
    color: rgb(101, 220, 180);
}
</style>