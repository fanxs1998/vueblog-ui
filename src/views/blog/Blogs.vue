<template>
	<div>
		<blog-header></blog-header>

		<div class="block">
			<el-timeline>
				<el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
					<el-card>
						<router-link :to="'/blog/'+blog.blogId">
							<h4>{{blog.title}}</h4>
						</router-link>

						<p>{{blog.description}}</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</div>
		<el-pagination class="m-page"
									 background
									 layout="prev, pager, next"
									 :current-page="currentPage"
									 :page-size="pageSize"
									 :total="total"
									 @current-change="page">
		</el-pagination>
	</div>
</template>

<script>
  import BlogHeader from "../../components/content/BlogHeader";
  export default {
    name: "Blogs",
		components: {BlogHeader},

		data() {
    	return {
    		blogs: {},
    		currentPage: 1,
				total: 0,
				pageSize: 5
			}
		},

		methods: {
    	page(currentPage) {
    		this.$axios.get("/blog?currentPage=" + currentPage).then(res => {
    			console.log(res)
					this.blogs = res.data.data.records
					this.currentPage = res.data.data.current
					this.total = res.data.data.total
					this.pageSize = res.data.data.size
				})
			}
		},

		created() {
    	this.page(1)
		}
	}
</script>

<style scoped>
	.m-page {
		margin: 0 auto;
		text-align: center;
	}
</style>
