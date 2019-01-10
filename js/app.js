(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	// 这里写js代码

	var id = 10; // todoitem的唯一标识符, 递增不重复
	const vm = new Vue({
		el: '.todoapp',
		data: {
			todoItem: '',  //绑定输入框value
			// isEdit: false,  //标记是否编辑
			items: [       //绑定所有的todoitem
				{ id: 1, content: 'test-js', isFinished: true, isEdit: false },
				{ id: 2, content: 'test-js2', isFinished: false, isEdit: false }
			],
		},
		methods: {
			// add
			addItem() {
				if (!this.todoItem.trim()) { //空串不添加提示用户
					alert('待办事项不能为空')
					return;
				}
				this.items.push({
					id: ++id,
					content: this.todoItem,
					isFinished: false
				});
				//重置todoItem为空
				this.todoItem = ''
				//本地存储
				this.setItems('xx-todo', this.items);
			},
			// delete
			deleteItem(id) {
				if (id) {
					// 根据item的id来删除items中的数据
					let index = this.items.findIndex(v => v.id == id);
					if (index != -1) {
						this.items.splice(index, 1);
						//本地更新
						this.setItems('xx-todo', this.items);
					}
				}
			},
			// editItem
			editItem(id) {
				let index = this.find(id);
				// console.log(index);	
				if (index != -1) {
					this.items[index].isEdit = true;
				}
			},
			//finishEdit
			finishEdit(id) {
				// 结束编辑 
				let index = this.find(id);
				if(index != -1) {
					this.items[index].isEdit = false;
					//本地更新
					this.setItems('xx-todo', this.items);
				}
			},

			//根据id返回对应的items的index下标
			find(id) {
				return this.items.findIndex(v => v.id == id);
			},

			// 本地存储 v为对象
			setItems(k,v) {
				sessionStorage.setItem(k, JSON.stringify(v));
			},
			// 取数据
			getItems(k) {
				return JSON.parse(sessionStorage.getItem(k))
			}
		},

		mounted() {
			this.items = this.getItems('xx-todo') || [];
		}
	})

})(window);
