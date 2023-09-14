export default (await
    import ('vue')).defineComponent({
    name: 'ManagerGrillaView',
    data: function() {
        return { daform: [], dafield: [] };

    },
    created() {
        this.fetch();
    },
    methods: {
        fetch() {
            const idConfigForm = this.$route.params.idConfigForm;
        }
    }
});