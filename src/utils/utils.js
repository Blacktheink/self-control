//浏览器后退重置数据
export let mixin={
    activated() {
        const _this = this;
        if(_this.$route.meta.isBack){
            // _this.resetPage();
            _this.$store.commit('pc/changIsClose');
            _this.$nextTick(() => {
                _this.$store.commit('pc/changIsClose');
                _this.$route.meta.isBack =false;
            });
        }
    },
};
export default {
    mixin
}