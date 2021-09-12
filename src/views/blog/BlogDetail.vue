<template>
	<div>
		<BlogHeader/>
		<div class="m-blog">
			<h2>{{ blog.title }}</h2>
			<el-link icon="el-icon-edit" v-if="ownBlog">
				<router-link :to="{name: 'BlogEdit', params: {blogId: blog.blogId}}">
					编辑
				</router-link>
			</el-link>
			<el-divider></el-divider>
			<div class="content markdown-body" v-html="blog.content"></div>
		</div>
	</div>
</template>

<script>
  import BlogHeader from "../../components/content/BlogHeader";
  import 'github-markdown-css/github-markdown.css'
	export default {
    name: "BlogDetail",
		components: {BlogHeader},
		data() {
    	return {
    		blog: {
    			userId: '',
					blogId: '',
    			title: '',
					content: ''
				},
				ownBlog: false
			}
		},
		created() {
    	const blogId = this.$route.params.blogId
			this.$axios.get('/blog/' + blogId).then(res => {
				const blog = res.data.data
				this.blog.userId = blog.userId
				this.blog.blogId = blog.blogId
				this.blog.title = blog.title

				// markdown渲染
				var MarkdownIt = require('markdown-it'),
					md = new MarkdownIt();
				var result = md.render(this.blog.content);
				this.blog.content = result
				this.blog.content = blog.content
				this.ownBlog =  (this.blog.userId === this.$store.getters.getUser.id)
			})
		}
	}
</script>

<style scoped>
	.m-blog {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		width: 100%;
		min-height: 700px;
	}
</style>
