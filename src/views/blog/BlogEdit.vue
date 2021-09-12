<template>
	<div>
		<BlogHeader/>
		<div class="m-content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="标题" prop="title">
					<el-input v-model.trim="ruleForm.title"></el-input>
				</el-form-item>
				<el-form-item label="摘要" prop="description">
					<el-input type="textarea" v-model.trim="ruleForm.description"></el-input>
				</el-form-item>
				<el-form-item lable="内容" prop="content">
					<mavon-editor v-model="ruleForm.content"></mavon-editor>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
  import BlogHeader from "../../components/content/BlogHeader";
	export default {
    name: "BlogEdit",
		components: {BlogHeader},
		data() {
			return {
				ruleForm: {
					blogId: '',
					title: '',
					description: '',
					content: ''
				},
				rules: {
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' },
						{ min: 1, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					description: [
						{ required: true, message: '请填写摘要', trigger: 'blur' }
					],
					content: [
						{ required: true, message: '请填写内容', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post('blog/edit', this.ruleForm, {
							headers: {
								"Authorization": localStorage.getItem("token")
							}
						}).then(res => {
							this.$alert('保存成功', '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$router.push('/blogs')
								}
							});
						})

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		created() {
    	const blogId = this.$route.params.blogId
			console.log(blogId)
			if(blogId) {
				this.$axios.get('/blog/' + blogId).then(res => {
					const blog = res.data.data
					this.ruleForm.blogId = blog.blogId
					this.ruleForm.title = blog.title
					this.ruleForm.description = blog.description
					this.ruleForm.content = blog.content

				})
			}
		}
	}
</script>

<style scoped>
	.m-content {
		margin: 0 auto;
		text-align: center;
	}
</style>
