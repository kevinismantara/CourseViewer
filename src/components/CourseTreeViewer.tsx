import React from "react"

export interface CourseItem {
  id: number
  name: string
  parent_id: number 
}

interface CourseTreeViewerProps {
  data: CourseItem[]
}

interface TreeNode extends CourseItem {
  children: TreeNode[]
  depth: number
}

/**
 * This function builds out TreeNode, so we can map out the parent course and its children.
 * I assume that the data can be invalid, so we need to check if the data is renderable.
 * @data CourseTreeViewerProps 
 * @returns TreeNode[]
 */
export function CourseTreeViewer({ data }: CourseTreeViewerProps) {
  function buildTree(items: CourseItem[]): TreeNode[] {
    if (items.length === 0) {
      return []
    }
    const itemMap = new Map<number, TreeNode>()
    const parentList: TreeNode[] = []
    let isRenderable = false // To check if the data is renderable

    items.forEach(item => {
      if (item.parent_id === 0) { // If there exists at least one parent_id is 0, then the data is renderable
        isRenderable = true
      }
      itemMap.set(item.id, {
        ...item,
        children: [],
        depth: 0
      })
    })

    // We return empty list if the data is not renderable
    if (!isRenderable) {
      throw new Error("There is an issue with the data")
    }

    items.forEach(item => {
      const node = itemMap.get(item.id)!
      
      if (item.parent_id === 0) {
        parentList.push(node)
      } else {
        const parent = itemMap.get(item.parent_id)
        if (parent) {
          parent.children.push(node)
        } else {
          // This can happen if the parent does not exist in the item map for some reason
          throw new Error("There is an issue with the data")
        }
      }
    })

    function calculateDepth(nodes: TreeNode[], depth: number = 0) {
      nodes.forEach(node => {
        node.depth = depth
        calculateDepth(node.children, depth + 1)
      })
    }

    calculateDepth(parentList)
    return parentList
  }

  function renderTree(nodes: TreeNode[]): React.ReactNode {
    return nodes.map(node => (
      <div key={node.id}>
        <div style={{ marginLeft: `${node.depth * 20}px` }}>
          {node.depth > 0 && "- ".repeat(node.depth)}
          {node.name}
        </div>
        {node.children.length > 0 && renderTree(node.children)}
      </div>
    ))
  }

  try {
    const courseData = buildTree(data)
    return (
      <div className="course-tree">
        {courseData.length > 0 ? (
          renderTree(courseData)
        ) : (
          <div className="text-muted"> No courses found </div>
        )}
      </div>
    )
  } catch (error) {
    console.error(error)
    return <div className="text-muted"> There is an issue with the data </div>
  }
}
