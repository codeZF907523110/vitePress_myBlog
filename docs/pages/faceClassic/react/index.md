# React面经
## 1. React生命周期
  | 阶段                | 生命周期钩子        | 描述               |
  | ------------------- | ------------------ | ------------------ |
  | 初始化/挂载 | constructor(props) |构造函数，在组件实例化时调用，用于设置初始状态或绑定实例方法 |
  | 挂载前/实例化后 | static getDerivedStateFromProps(props, state) | （可选）在每次渲染前调用，返回新的state以响应props更改，但不推荐过度依赖此方法 |
  | 挂载前 | render() | 必须定义的方法，用于返回jsx元素，React根据此方法渲染DOM |
  | 挂载后 | componentDidMount() | 组件挂载到DOM后调用，常用于网络请求、订阅或手动操作DOM |
  | 更新前 | shouldComponentUpdate(nextProps, nextState) | （可选）在props或state即将更改时调用，返回布尔值决定是否重新渲染 |
  | 更新前 | static getSnapshotBeforeUpdate(prevProps, prevState) | 在最新的渲染被提交到DOM之前获取一些信息，返回值将在 componentDidUpdate 中作为第三个参数 |
  | 更新 | render() | （同上）在props或state更改时再次调用 |
  | 更新后 | componentDidUpdate(prevProps, prevState, snapshot) | 组件完成更新并重新渲染到DOM后调用 |
  | 卸载前 | componentWillUnmount() | 组件从DOM移除之前调用，用于清理工作如取消定时器、解绑事件监听器等 |
## 2. 说一下React的PureComponent
  - **什么是PureComponent?**
    > **PureComponent是React中的一个组件基类。与React的Component类相比，PureComponent通过对组件的props和state进行浅比较（shallow compare），来减少不必要的渲染，从而提高应用的性能。**
  - **它是如何工作的?**
    > **PureComponent通过对组件的props和state进行浅比较来优化这一过程。所谓“浅比较”指的是，比较对象的引用是否相同，而不是比较对象内部的值是否完全相同。**
  - **使用PureComponent的优势**
    - **减少不必要的渲染**：通过避免组件的无谓更新，可以显著提高应用的性能。
    - **简化开发流程**：在一些简单的场景下，使用PureComponent可以避免手动编写冗长的shouldComponentUpdate方法。
    - **提高用户体验**：减少渲染次数意味着更快的页面响应，这对于提升用户体验非常重要。
  - **如何使用PureComponent**
    > **使用PureComponent非常简单。当你的组件没有复杂的props或state结构时，你可以通过将组件继承自PureComponent而不是Component来利用它的优化特性。**
    ```JavaScript
      import React, { PureComponent } from 'react';
      class MyComponent extends PureComponent {
        render() {
          return <div>{this.props.message}</div>;
        }
      }
    ```
  - **注意事项**
    - **深层对象比较**：如果你的组件使用了深层次的对象作为props或state，PureComponent的浅比较可能无法检测到深层次的变更，这时你可能需要手动实现shouldComponentUpdate或使用不可变数据来避免问题。
    - **适用场景**：并不是所有的组件都适合使用PureComponent，评估你的应用场景，判断是否真的需要使用它。
## 3. React.memo 是什么
  > **React.memo是React中的一个高阶函数，用于包裹函数组件， 并对该组件的返回结果进行记忆，只有当组件的props改变时，才会重新计算渲染结果，所以它对于防止不必要的渲染非常有用。**
  - **事例：使用React.memo来优化性能**   

    **考虑以下示例，在下面的组件中，`List` 组件接受`items的props`，并对其进行映射：**
    ```js
      function List({ items }) {
        console.log('Rendering List...');
        return (
          <ul>
            {items.map(item => <li>{item}</li>)}
          </ul>
        );
      }
    ```
    **在这种情况下，即使父组件发生重新渲染，只要items的props没有改变，我们并不想让List组件执行不必要的重新渲染。这时候就可以使用React.memo：**
    ```js
      const List = React.memo(({ items })=>{
        console.log('Rendering List...');
        return (
          <ul>
            {items.map(item => <li>{item}</li>)}
          </ul>
        );
      });
    ```
## 4. React懒加载
  > React 的懒加载（Lazy Loading）是一种优化技术，可以帮助开发者提高应用的性能，减小初始加载时的资源消耗。本文将深入探讨如何在 React 中实现组件的懒加载，包括使用内置的 React.lazy 和 Suspense 组件，以及其他一些最佳实践。
  - **使用 React.lazy 实现懒加载**
    > React 提供了一个内置的 React.lazy 方法，使得懒加载组件变得异常简单。React.lazy 接受一个函数作为参数，该函数使用动态 import() 导入组件。
    - **基本用法：**
      ::: details 示例：React 提供了一个内置的 React.lazy 方法，使得懒加载组件变得异常简单。React.lazy 接受一个函数作为参数，该函数使用动态 import() 导入组件。
        ```JavaScript
          import React, { Suspense } from 'react';
          // 使用 React.lazy 进行懒加载
          const About = React.lazy(() => import('./About'));
          const Home = () => {
            return <h1>Home Page</h1>;
          };
          const App = () => {
            const [showAbout, setShowAbout] = React.useState(false);
            return (
              <div>
                <Home />
                <button onClick={() => setShowAbout(true)}>Load About</button>
                {showAbout && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <About />
                  </Suspense>
                )}
              </div>
            );
          };
          export default App;
        ```
      :::
      **在这个示例中，About 组件只有在 showAbout 状态为 true 时才会加载。Suspense 组件用于处理懒加载期间的加载状态，fallback 属性指定了加载期间显示的内容。**
    
    - **使用路由进行懒加载**
      > 在实际开发中，通常会将懒加载与路由结合使用，来实现页面级别的懒加载。React Router 提供了一个简单的方式来实现这一点。
      ::: details 示例：
        ``` JavaScript
          import React, { Suspense } from 'react';
          import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
          const Home = () => <h1>Home Page</h1>;
          const About = React.lazy(() => import('./About'));
          const App = () => {
            return (
              <Router>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                  </Switch>
                </Suspense>
              </Router>
            );
          };
          export default App;
        ```
      :::
## 5. ReactDOM.createPortal
  > Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外

  > 因此Portals 适合脱离文档流(out of flow) 的组件，特别是 position: absolute 与 position: fixed的组件。比如模态框，通知，警告，goTop 等
  - **示例：**
    ::: details 点击查看代码
      ```JavaScript
        import { createPortal } from 'react-dom';
        const Demo = () => {
          const handleClick = () => {
            createPortal(<div>ReactDom.Portal Demo</div>, document.querySelector('.myDiv'));
          };

          return (
            <div>
              <div className="myDiv">Demo</div>
              <button onClick={handleClick}>click</button>
            </div>
          );
        };

      ```
    :::
## 5. React性能优化手段
  > **React中进行性能优化的手段可以从多个维度进行分类，以下是一些关键类别及其对应的优化策略：**
  ##### **组件优化**
  - **使用`PureComponent`或`React.memo`对于仅根据props和state改变才重新渲染的组件，使用`React.PureComponent`或者对其包装一层`React.memo`，它们都能通过浅比较props来避免不必要的重新渲染。**
  - **使用`shouldComponentUpdate`指定组件是否更新**
    > **当组件的 props 或 state 发生变化时，React 会调用 shouldComponentUpdate。该方法接受两个参数：新的 props 和新的 state。开发者可以通过该方法返回一个布尔值，来指示 React 是否应该重新渲染组件。**
      > ```js
      >    shouldComponentUpdate(nextProps, nextState) {
      >      // return true 或 false
      >    }
      > ```
  - **使用`useMemo/useCallback`缓存**
  > **useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。**
  - **`useMemo`：用法类似与vue中的computed，只有所依赖的state/props发生改变才会触发，否则会返回已缓存的数据**
    - **事例：**
      ::: details 点我查看代码
        ```JavaScript
          export default function WithMemo() {
            const [count, setCount] = useState(1);
            const [val, setValue] = useState('');
            const expensive = useMemo(() => {
                console.log('compute');
                let sum = 0;
                for (let i = 0; i < count * 100; i++) {
                    sum += i;
                }
                return sum;
            }, [count]);
        
            return <div>
                <h4>{count}-{expensive}</h4>
                {val}
                <div>
                    <button onClick={() => setCount(count + 1)}>+c1</button>
                    <input value={val} onChange={event => setValue(event.target.value)}/>
                </div>
            </div>;
          }
        ```
      :::
  - **`useCallback`：当父组件向子组件传递了函数，也会引发 React.memo 缓存组件失效，因为函数也是引用类型的数据，父组件重新渲染时，传给子组件的函数的内存地址也会重新生成，引发子组件重新渲染。**
      - **事例：**
        ::: details 点我查看代码
          ```JavaScript
            import { useState, useCallback } from "react";
            import Child1 from "./Child1.jsx";
            import Child2 from "./Child2.jsx";

            export default function Father() {
              console.log("渲染父组件");

              const [num, setNum] = useState(0);

              function increase() {
                setNum(num + 1);
              }

              const printNum = useCallback(() => {
                console.log("打印 num ：", num);
              }, []);

              return (
                <div style={{ border: "1px solid", padding: "10px" }}>
                  <h1>父组件</h1>
                  <p>num的值为：{num}</p>
                  <button onClick={increase}>+1</button>
                  <Child1 />
                  <Child2 printNum={printNum} />
                </div>
              );
            }

          ```
        :::
  ##### **状态管理与变更**
  - **减少不必要的setState调用：合并多次对同一状态的修改，例如使用useState hook时，可以利用函数式的setState来一次性更新多个状态值。**
  - **选择性地更新state：只在props或state真正发生变化时才进行更新，避免频繁或大面积的state变更引发大量子组件重新渲染。**
  ##### **Virtual DOM与Diff算法优化**
  - **合理构建组件层级：保持组件树扁平化，减少不必要的嵌套层次，使React的diff算法更高效。**
  - **利用key属性：为列表元素提供稳定的唯一key，帮助React识别并最小化DOM变动。**
  - **少用 dom 层级 多使用箭头标签替代**
  ##### **事件处理优化**
  - **使用合成事件：React的合成事件系统可以减少全局事件监听器的数量，提高事件处理效率。**
  - **避免内联函数绑定：在事件处理函数中，避免每次渲染时创建新的函数引用，而是使用箭头函数或者useCallback来缓存函数引用。**
  ##### **懒加载与代码分割**
  - **动态导入：使用React.lazy和Suspense来按需加载组件，减轻初始加载负担，提高首屏加载速度。**
  - **使用优先级加载CSS、JavaScript和图片资源。**
  ##### **优化渲染过程**
  - **使用ReactDOM.createPortal：将某些组件渲染到根DOM之外，比如渲染到document.body，可以避免不必要的re-render。**
  - **CSS动画与交互优化：配合requestAnimationFrame等API来处理复杂的动画，减少不必要的布局重排和重绘。**
  #### **工具辅助**
  - **Profiler工具：利用React DevTools的Profiler面板分析组件渲染性能瓶颈。**
  - **性能监控与警告：设置性能指标监控点，及时发现和修复潜在性能问题。**

## 6. React如何捕获错误
  > **在React中，有几种方法可以用来捕获错误：**
  - **组件级别的错误处理**

    **在组件内部，我们可以通过try-catch块来捕获错误。**
  - **React的错误边界（Error Boundaries）**
  
    **React 16引入了错误边界的概念，它允许我们通过高阶组件来捕获并处理子组件树中发生的任何错误。**
    ::: details **点开查看案例**
      ```JavaScript
        class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = { hasError: false };
          }

          static getDerivedStateFromError(error) {
            // 更新state，使下一次渲染能够显示降级后的UI
            return { hasError: true };
          }

          componentDidCatch(error, errorInfo) {
            // 你也可以将错误日志上报给服务器
            console.error(error, errorInfo);
          }

          render() {
            if (this.state.hasError) {
              // 你可以渲染任何自定义的降级UI
              return <h1>Something went wrong.</h1>;
            }

            return this.props.children;
          }
        }
      ```
    :::
    > 在上面的示例中，ErrorBoundary 组件可以在其子组件树中的任何位置捕获错误。当捕获到错误时，getDerivedStateFromError 生命周期方法会被调用，我们可以在这里设置组件的状态以渲染错误UI。componentDidCatch 生命周期方法则可以用来记录错误或执行其他错误处理操作。
  - **错误边界的限制**
    > **虽然错误边界是一个非常有用的特性，但它并不能捕获所有类型的错误。以下是一些错误边界无法捕获的情况：**
    1. **事件处理器中的错误（例如，点击事件）**
    2. **异步代码（例如，setTimeout或requestAnimationFrame回调函数）**
    3. **服务端渲染过程中发生的错误**
    4. **错误边界自身抛掷的错误（不会被同一个错误边界捕获）**

    因此，除了使用错误边界之外，我们还需要结合其他错误处理策略来确保应用程序的健壮性。

## 7. tsx转换成真实DOM过程
  > react中的jsx语法会通过babel转化为 js代码，以React.createElement函数形式存在，createElement函数返回一个ReactElement函数，ReactElement函数返回一个个的虚拟节点，虚拟节点进行嵌套就形成了虚拟DOM，最后通过ReactDOM.render方法转化为真实DOM。
  - **React.createElement**示例：
    ::: details 点击查看代码
      ```JavaScript
        <div>
            <img src="avatar.png" className="profile" />
            <Hello />
        </div>

        //转化后
        React.createElement(
            "div",
            null,
            React.createElement("img", {
              src: "avatar.png",
              className: "profile"
            }),
            React.createElement(Hello, null)   //组件的名称
        );

      ```
    :::
  - **babel在转化jsx过程中，会判断首字母的大小写**
    1. 当首字母为小写的时候，会被认为是原生DOM标签， 那么createElement中的第一个参数就是一个字符串，表示标签的名称
    2. 当首字母为大写的时候，会被认为是组件，那么createElement中的第一个参数就是组件的名称，如上面的Hello
  - **createElement会根据传入的type进行判断：**
    1. 如果是原生标签节点，type是字符串，如 span div
    2. 如果是文本节点，type就没有
    3. 如果是函数组件，type就是函数名
    4. 如果是类组件，type就是类组件名

    **首次渲染的时候，容器中的所有DOM节点都会被替换掉，以后的跟新就会使用react中的diff算来，来进行比较。**

    **如果传递了callback回调函数，就会在渲染完成的时候，再进行回调。**
  - **render函数的实现**
    ::: details 点击查看
      ```JavaScript
        // render函数的阿实现
        function render(vnode, container) {
          const node = createNode(vnode, container)
          container.appendChild(node)
        }

        // createNode函数的实现
        function createNode(vnode, parentNode) {
          let node = null
          const { type, props, children } = vnode
          if(type === TEXT) {
              node = document.createTextNode('')
          } else if(typeof type === 'string') {
              node = document.createElement(type)
          } else if(typeof type === 'function') {
              //isReactComponent是类组件原型上的一个对象，有isReactComponent说明是类组件
              node = type.isReactComponent ? renderClass(vnode, parentNode) : renderFunction(vnode, parentNode)
          }
          renderChild(children, node)
          //处理props，绑定在节点上面
          handleProps(node, props)
          return node
        }

        // renderChild函数的实现（思路）
        // 循环遍历 子节点， 然后依次调用render函数
        function renderChild(childArr, parentNode) {
            for(let i = 0; i < childArr.length; i++) {
                let child = childArr[i]
                if(Array.isArray(child)) {
                    for(let k = 0; k < child.length; k++) {
                        render(child[k], parentNode)
                    }
                } else {
                    render(child, parentNode)
                }
            }
        }

        // handleProps函数的实现（思路）
        //在createElement函数中，已经收集了（数组的形式）
        function handleProps(node, props) {
            Object.keys(props).forEach(item => {
                //处理事件（onclick）等
                if(item.slice(0,2) === 'on') {
                    let eventName = item.slice(2).toLocaleLowerCase()
                    node.addEventListener(eventName, props[item])
                } else {
                    node[item] = props[item]
                }
            })
        }

        // 渲染函数组件的方法实现
        function renderFunction(vnode, parentNode) {
          const { type, props } = vnode
          //type是个函数名，执行函数，传入props
          const node = type(props)
          //调用真实节点函数,生成一个真实DOM，并返回
          return createNode(node, parentNode)
        }

        // 渲染类组件
        function renderClass(vnode, parentNode) {
          const { type, props } = vnode
          //type是一个类（构造函数）， 通过new创建一个实例
          const node = new type(props)
          //创建实例后，调用render方法
          const renderNode = node.render()
          //调用真实节点函数,生成一个真实DOM，并返回
          return createNode(renderNode, parentNode)
        }
      ```
    :::


## 8. 对Fiber架构的理解
  > Fiber是React为了解决在15版本中由于递归比对VirtualDOM导致的性能问题而引入的。它通过循环模拟递归，分片处理任务，允许在浏览器空闲时间执行，避免长时间占用主线程。Fiber将任务拆分成可中断的小单元，构建了一个链表结构，使得React能更高效地管理DOM更新，提高了用户体验。在构建和提交阶段，Fiber优化了DOM操作的顺序，确保了更新的流畅性。
  - **Fiber出现的目的是什么**

    为了提高React渲染页面的效率，减少页面卡顿，提升用户体验。
  - **在Fiber出现之前React存在什么问题**
    1. **主线程阻塞**：在React 15及更早版本中，当组件树发生更新时，React会通过递归算法一次性完成整个组件树的渲染过程，这个过程如果涉及大量组件， 会导致主线程长时间阻塞，无法处理其他的UI交互，从而造成卡顿和延迟，降低用户体验。
    2. **无法中断与恢复渲染**：原有的渲染过程不具备中断和恢复的能力，一旦开始渲染，就必须等到整个过程结束，即使在中间有更高优先级的任务也需要等待。
    3. **无法实现增量渲染**：以往的React无法有效区分渲染任务的重要性和紧急程度，所有更新任务都被视为同等重要的，无法做到逐步、增量地渲染UI。
    4. **资源优化不足**：旧版React无法根据应用的具体需求动态分配资源，无法高效利用有限的CPU周期来优化渲染性能。
  - **Fiber 如何解决性能问题**
    在 Fiber 架构中 React 放弃了递归调用，采用循环来模拟递归，因为循环可以随时被中断。

    React 利用浏览器空闲时间执行比对任务，绝不占用主线程。 解决了 React 执行比对任务长期占用主线程的问题。

    React 在执行完一个任务单元后，查看是否有其他的高优先级任务，如果有，放弃占用主线程，先执行优先级高的任务。
  - **什么是 Fiber？**
    - ***将任务拆分成了一个一个小的任务单元***

      在 React 16 中，将整个任务拆分成了一个一个小的任务进行处理，每一个小的任务指的就是一个 Fiber 节点的构建。

    - ***闲时执行任务***

      任务会在浏览器的空闲时间被执行，每个单元执行完成后，React 都会检查是否还有空余时间，如果有就交还主线程的控制权。
  - **Fiber 是一种数据结构(链表)**

    React 通过`链表结构`找到下一个要执行的任务单元。

    要构建`链表结构`，需要知道每一个节点的父级节点是谁，要知道他的子级节点是谁，要知道他的下一个兄弟节点是谁。

    Fiber 其实就是 JavaScript 对象，是虚拟dom的增强版本，存储的信息比虚拟dom多。在这个对象中有 child 属性表示节点的子节点，有 sibling 属性表示节点的下一个兄弟节点，有 return 属性表示节点的父级节点。

    ```JavaScript
      type Fiber = {
        // type：组件类型。 div、span、组件构造函数
        type: any,
        // DOM 对象
        stateNode: any,
        // 指向自己的父级 Fiber 对象
        return: Fiber | null,
        // 指向自己的第一个子级 Fiber 对象
        child: Fiber | null,
        // 指向自己的下一个兄弟 iber 对象
        sibling: Fiber | null,
      };
    ```
  - **render 阶段：**
    1. 构建 Fiber 对象
    2. 构建链表，在链表中标记Fiber要执行的 DOM 操作 ，这个过程是可中断的。（找差异的过程）
  - **commit (提交渲染)阶段：**

    根据构建好的链表执行 DOM 操作，这个阶段是不可中断

## 9. React diff算法原理
  > React中的diff算法是其核心优化策略之一，用于比较新旧两个虚拟DOM树之间的差异，并找出最小化的DOM操作集以更新真实DOM。以下是React中diff算法的大致步骤概述：
  - **树结构比较:**
    1. React并不会简单地递归遍历整颗新旧虚拟DOM树进行全量比较，而是采用分层比较的思想，仅比较同层级的节点。
    2. 它首先会比较树的根节点，如果根节点不同，则直接替换整个根节点对应的真实DOM元素。
  - **同层级节点比较:**
    1. 对于同层级的子节点，React会尝试找到旧树中与新树中每一个节点相匹配的节点，主要依据是它们的key属性。
    2. 如果找到了具有相同key的节点，则认为它们是同一个“实体”，只需更新属性或内容。
    3. 如果没有找到相同key的节点，则视为新增或删除节点。
## 10. React render方法的原理
  > React的render方法是React组件的核心方法之一，它的基本原理和作用在于将组件的状态和属性转化为可以在浏览器中渲染的虚拟DOM表示，然后将这个虚拟DOM转化为实际的DOM操作，最终更新到浏览器的真实DOM中。
  - 当组件实例化并初次插入到DOM中时，React会调用该组件的render方法。这个方法必须返回一个React元素（可以是原生DOM元素、组件元素或Fragment），React会根据这个返回值创建一个虚拟DOM树。
  - render方法返回的是一个虚拟DOM树，这是一个轻量级的JavaScript对象结构，与实际的DOM树结构相似但并非真实的DOM节点。
  - 当组件的props或state发生变化时，React会重新执行render方法生成新的虚拟DOM树。
  - React使用其内部的高效算法——虚拟DOM Diff算法，比较新旧两棵虚拟DOM树的差异。
  - 根据虚拟DOM的比较结果，React确定最少必要的DOM操作，如添加、更新或删除DOM节点，而不是每次都完全重建DOM树。
  - 这种增量更新机制极大提高了React应用的性能，因为它避免了频繁地直接操作DOM带来的性能损耗。
  - 最终，React将这些最小化的DOM操作应用到实际DOM树上，确保用户界面得到准确、高效的更新。
  > React render方法的作用就是将组件的状态和属性转化为虚拟DOM，通过虚拟DOM Diff算法来决定实际DOM的最小更新操作，从而实现高性能的用户界面更新。在类组件中，render方法是必需的，而在函数组件中，函数体本身充当了render方法的角色。

