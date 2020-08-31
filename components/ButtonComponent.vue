<template>
    <button @click="submitButton"
            :class="{ 'loading': buttonTimeout }"
    >
        <span style="z-index:2;position:relative;"
              v-html="buttonText"
        />
        <span style="z-index:1;position:absolute;background-color:#000;right:0;top:0;bottom:0;"
              :style="[
                { 'transition': buttonTimeout ? 'width ' + parseInt(duration) + 's linear, opacity 0.3s ease-in-out' : 'none'},
                buttonTimeout ? {width: '0px', opacity: '0.25'} : {width: '100%', opacity: '0'}
             ]"
        />
    </button>
</template>

<script>
export default {
    name     : 'TimeoutButton',
    data() {
        return {
            buttonTimeout : null
        }
    },
    props    : {
        duration    : {
            type     : [Number, String],
            required : true
        },
        loadingText : {
            type     : String,
            required : false
        }
    },
    mounted() {
        this.$on('cancel', () => {
            this.resetButton();

            return this.$emit('canceled');
        });
    },
    methods  : {
        submitButton() {
            if (this.buttonTimeout) {
                return this.$emit('interrupting');
            }

            this.$emit('click');

            this.buttonTimeout = setTimeout(() => {
                this.resetButton();

                this.$emit('completed');
            }, parseInt(this.duration) * 1000);
        },
        resetButton() {
            clearInterval(this.buttonTimeout);
            this.buttonTimeout = null;
        }
    },
    computed : {
        buttonText() {
            if (this.buttonTimeout && this.loadingText) {
                return this.loadingText;
            } else if (!this.$slots || !this.$slots.default || !this.$slots.default[0] || !this.$slots.default[0].text) {
                console.error('Trying to get default value of TimeoutButton, got undefined.');
            } else {
                return this.$slots.default[0].text;
            }
        }
    }
}
</script>
