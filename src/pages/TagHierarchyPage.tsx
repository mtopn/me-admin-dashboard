import { useState, useMemo } from "react";
import type { TagNode, FlatNode } from "../types";
import {
  tagHierarchyData,
  deepCloneTree,
  renameInTree,
  changeIdInTree,
  removeFromTree,
  findNode,
  insertIntoTree,
  filterTree,
} from "../data";

// Local collectAllNodes — excludes a node by id (different from data.ts version)
function collectAllNodes(
  node: TagNode,
  excludeId: string,
  parentId: string | null = null,
  path = "",
): FlatNode[] {
  const result: FlatNode[] = [];
  const uniqueKey = path ? path + "/" + node.id : node.id;
  if (node.id !== excludeId)
    result.push({ id: node.id, label: node.label, parentId, uniqueKey });
  if (node.children)
    node.children.forEach((c) => {
      result.push(...collectAllNodes(c, excludeId, node.id, uniqueKey));
    });
  return result;
}

// Local isDescendant — checks whether nodeId is inside ancestorId's subtree
function isDescendant(
  tree: TagNode,
  ancestorId: string,
  nodeId: string,
): boolean {
  const ancestor = findNode(tree, ancestorId);
  if (!ancestor) return false;
  return !!findNode(ancestor, nodeId);
}

// --- Editable Tree Node ---
function TreeNode({
  node,
  depth = 0,
  onRename,
  onMove,
  onChangeId,
  onMerchantLookup,
}: {
  node: TagNode;
  depth?: number;
  onRename: (id: string, newLabel: string) => void;
  onMove: (id: string) => void;
  onChangeId: (oldId: string, newId: string) => void;
  onMerchantLookup: (tagStr: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [editingTag, setEditingTag] = useState(false);
  const [editTagValue, setEditTagValue] = useState(
    node.id + " — " + node.label,
  );
  const [hovered, setHovered] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren;
  const maxIndent = 4;
  const clampedDepth = Math.min(depth, maxIndent);

  const handleEditTagSubmit = () => {
    const val = editTagValue.trim();
    const sep = val.includes("—") ? "—" : val.includes("-") ? "-" : null;
    if (sep) {
      const newId = val.split(sep)[0].trim();
      const newLabel = val.split(sep).slice(1).join(sep).trim();
      if (newId && newLabel) {
        if (newId !== node.id) onChangeId(node.id, newId);
        if (newLabel !== node.label) onRename(newId || node.id, newLabel);
      }
    }
    setEditingTag(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          marginLeft: clampedDepth * 20,
          borderRadius: 6,
          transition: "all 0.15s",
          background: hovered ? "#e8edff" : "transparent",
          boxShadow: hovered ? "0 1px 4px rgba(26,86,219,0.1)" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hasChildren ? (
          <span
            onClick={() => setExpanded(!expanded)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: 4,
              background: "#eef2ff",
              color: "#1a56db",
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
              cursor: "pointer",
              transition: "transform 0.2s",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            &#9654;
          </span>
        ) : node.label.toLowerCase().startsWith("merchant") ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a56db"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4CAF50",
              }}
            ></span>
          </span>
        )}

        {editingTag ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              flex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              value={editTagValue}
              onChange={(e) => setEditTagValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditTagSubmit();
                if (e.key === "Escape") {
                  setEditTagValue(node.id + " — " + node.label);
                  setEditingTag(false);
                }
              }}
              onBlur={handleEditTagSubmit}
              style={{
                padding: "4px 10px",
                border: "1px solid #1a56db",
                borderRadius: 4,
                fontSize: 13,
                outline: "none",
                flex: 1,
                minWidth: 200,
                background: "#f0f4ff",
              }}
            />
          </span>
        ) : (
          <>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: "#1a56db",
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {node.id}
            </span>
            <span
              onClick={() => hasChildren && setExpanded(!expanded)}
              style={{
                fontSize: 13,
                color: isLeaf ? "#555" : "#1a1a2e",
                fontWeight: isLeaf ? 400 : 500,
                cursor: hasChildren ? "pointer" : "default",
              }}
            >
              — {node.label}
            </span>
          </>
        )}

        {hovered && !editingTag && (
          <span
            style={{
              display: "inline-flex",
              gap: 4,
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditTagValue(node.id + " — " + node.label);
                setEditingTag(true);
              }}
              title="Edit Tag"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 28,
                paddingLeft: 8,
                paddingRight: 10,
                borderRadius: 4,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                color: "#666",
                fontSize: 12,
                gap: 4,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Tag
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMove(node.id);
              }}
              title="Move to another parent"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 4,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                color: "#666",
                fontSize: 13,
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3 3-3 3" />
                <path d="M12 2v10" />
                <path d="M2 12l3-3 3 3" />
                <path d="M2 12h10" />
                <path d="M12 22l3-3-3-3" />
                <path d="M12 22V12" />
                <path d="M22 12l-3-3-3 3" />
                <path d="M22 12H12" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMerchantLookup(node.id + " - " + node.label);
              }}
              title="Merchant Lookup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 28,
                paddingLeft: 8,
                paddingRight: 10,
                borderRadius: 4,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                color: "#666",
                fontSize: 12,
                gap: 4,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Merchant Lookup
            </button>
          </span>
        )}
      </div>
      {expanded && hasChildren && (
        <div
          style={{
            borderLeft: depth > 0 ? "1px solid #e0e7ff" : "none",
            marginLeft: clampedDepth * 20 + 8,
          }}
        >
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onRename={onRename}
              onMove={onMove}
              onChangeId={onChangeId}
              onMerchantLookup={onMerchantLookup}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Move Modal ---
function MoveModal({
  tree,
  movingNodeId,
  onConfirm,
  onCancel,
}: {
  tree: TagNode;
  movingNodeId: string;
  onConfirm: (nodeId: string, newParentId: string) => void;
  onCancel: () => void;
}) {
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [moveSearch, setMoveSearch] = useState("");
  const allNodes = useMemo(
    () => collectAllNodes(tree, movingNodeId),
    [tree, movingNodeId],
  );
  const movingNode = findNode(tree, movingNodeId);

  const validParents = useMemo(() => {
    return allNodes.filter(
      (n: FlatNode) => !isDescendant(tree, movingNodeId, n.id),
    );
  }, [allNodes, tree, movingNodeId]);

  const filteredParents = useMemo(() => {
    if (!moveSearch) return validParents;
    const q = moveSearch.toLowerCase();
    return validParents.filter(
      (n: FlatNode) =>
        n.id.toLowerCase().includes(q) || n.label.toLowerCase().includes(q),
    );
  }, [validParents, moveSearch]);

  if (!movingNode) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 28,
          width: 500,
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16, color: "#1a1a2e" }}>
            Move Node
          </h3>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#999",
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            padding: "12px 14px",
            background: "#f0f4ff",
            borderRadius: 6,
            marginBottom: 18,
            fontSize: 13,
          }}
        >
          <span style={{ color: "#888" }}>Moving: </span>
          <span
            style={{
              fontFamily: "monospace",
              color: "#1a56db",
              fontWeight: 500,
            }}
          >
            {movingNode.id}
          </span>
          <span style={{ color: "#1a1a2e" }}> — {movingNode.label}</span>
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#888",
            marginBottom: 8,
            letterSpacing: "0.5px",
          }}
        >
          SELECT NEW PARENT
        </div>
        <input
          value={moveSearch}
          onChange={(e) => setMoveSearch(e.target.value)}
          placeholder="Search parent by ID or name..."
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #e0e0e0",
            borderRadius: "6px 6px 0 0",
            fontSize: 13,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderTop: "none",
            borderRadius: "0 0 6px 6px",
            maxHeight: 320,
          }}
        >
          {filteredParents.map((n: FlatNode) => (
            <div
              key={n.uniqueKey}
              onClick={() => setSelectedParent(n.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                cursor: "pointer",
                borderBottom: "1px solid #f5f5f5",
                background: selectedParent === n.id ? "#eef2ff" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (selectedParent !== n.id)
                  e.currentTarget.style.background = "#fafbfc";
              }}
              onMouseLeave={(e) => {
                if (selectedParent !== n.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {selectedParent === n.id && (
                <span
                  style={{ color: "#1a56db", fontWeight: 700, fontSize: 14 }}
                >
                  &#10003;
                </span>
              )}
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#1a56db",
                  flexShrink: 0,
                }}
              >
                {n.id}
              </span>
              <span style={{ fontSize: 13, color: "#555" }}>— {n.label}</span>
            </div>
          ))}
          {filteredParents.length === 0 && (
            <div
              style={{
                padding: 16,
                textAlign: "center",
                color: "#999",
                fontSize: 13,
              }}
            >
              No matching branches
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "8px 20px",
              border: "1px solid #ddd",
              borderRadius: 4,
              background: "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedParent) onConfirm(movingNodeId, selectedParent);
            }}
            disabled={!selectedParent}
            style={{
              padding: "8px 20px",
              border: "none",
              borderRadius: 4,
              background: selectedParent ? "#1a56db" : "#ccc",
              color: "#fff",
              cursor: selectedParent ? "pointer" : "default",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Move here
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Create Tag Modal ---
function CreateTagModal({
  tree,
  onConfirm,
  onCancel,
}: {
  tree: TagNode;
  onConfirm: (id: string, label: string, parentId: string) => void;
  onCancel: () => void;
}) {
  const [tagInput, setTagInput] = useState("");
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [parentSearch, setParentSearch] = useState("");
  const allNodes = useMemo(() => collectAllNodes(tree, "__none__"), [tree]);

  const filteredParents = useMemo(() => {
    if (!parentSearch) return allNodes;
    const q = parentSearch.toLowerCase();
    return allNodes.filter(
      (n: FlatNode) =>
        n.id.toLowerCase().includes(q) || n.label.toLowerCase().includes(q),
    );
  }, [allNodes, parentSearch]);

  const parsedId = tagInput.includes("-")
    ? tagInput.split("-")[0].trim()
    : tagInput.trim();
  const parsedName = tagInput.includes("-")
    ? tagInput.split("-").slice(1).join("-").trim()
    : "";
  const selectedNode = allNodes.find((n: FlatNode) => n.id === selectedParent);
  const canSubmit = parsedId && parsedName && selectedParent;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 28,
          width: 520,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16, color: "#1a1a2e" }}>
            Create New Tag
          </h3>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#999",
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#888",
              marginBottom: 6,
              letterSpacing: "0.5px",
            }}
          >
            TAG ID — NAME
          </div>
          <input
            autoFocus
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="e.g. 3003811099 - New Region"
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid #d0d5dd",
              borderRadius: 6,
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {tagInput && (
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 8,
                fontSize: 12,
                color: "#888",
              }}
            >
              <span>
                ID:{" "}
                <span
                  style={{
                    fontFamily: "monospace",
                    color: parsedId ? "#1a56db" : "#ccc",
                    fontWeight: 500,
                  }}
                >
                  {parsedId || "—"}
                </span>
              </span>
              <span>
                Name:{" "}
                <span
                  style={{
                    color: parsedName ? "#1a1a2e" : "#ccc",
                    fontWeight: 500,
                  }}
                >
                  {parsedName || "—"}
                </span>
              </span>
            </div>
          )}
        </div>
        {selectedNode && (
          <div
            style={{
              padding: "10px 14px",
              background: "#f0f4ff",
              borderRadius: 6,
              marginBottom: 14,
              fontSize: 13,
            }}
          >
            <span style={{ color: "#888" }}>Parent: </span>
            <span
              style={{
                fontFamily: "monospace",
                color: "#1a56db",
                fontWeight: 500,
              }}
            >
              {selectedNode.id}
            </span>
            <span style={{ color: "#1a1a2e" }}> — {selectedNode.label}</span>
          </div>
        )}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#888",
            marginBottom: 8,
            letterSpacing: "0.5px",
          }}
        >
          SELECT PARENT BRANCH
        </div>
        <input
          value={parentSearch}
          onChange={(e) => setParentSearch(e.target.value)}
          placeholder="Search parent..."
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #e0e0e0",
            borderRadius: "6px 6px 0 0",
            fontSize: 13,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderTop: "none",
            borderRadius: "0 0 6px 6px",
            maxHeight: 240,
          }}
        >
          {filteredParents.map((n: FlatNode) => (
            <div
              key={n.uniqueKey}
              onClick={() => setSelectedParent(n.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                cursor: "pointer",
                borderBottom: "1px solid #f5f5f5",
                background: selectedParent === n.id ? "#eef2ff" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (selectedParent !== n.id)
                  e.currentTarget.style.background = "#fafbfc";
              }}
              onMouseLeave={(e) => {
                if (selectedParent !== n.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {selectedParent === n.id && (
                <span
                  style={{ color: "#1a56db", fontWeight: 700, fontSize: 14 }}
                >
                  &#10003;
                </span>
              )}
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#1a56db",
                  flexShrink: 0,
                }}
              >
                {n.id}
              </span>
              <span style={{ fontSize: 13, color: "#555" }}>— {n.label}</span>
            </div>
          ))}
          {filteredParents.length === 0 && (
            <div
              style={{
                padding: 16,
                textAlign: "center",
                color: "#999",
                fontSize: 13,
              }}
            >
              No matching branches
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "8px 20px",
              border: "1px solid #ddd",
              borderRadius: 4,
              background: "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (canSubmit) onConfirm(parsedId, parsedName, selectedParent!);
            }}
            disabled={!canSubmit}
            style={{
              padding: "8px 20px",
              border: "none",
              borderRadius: 4,
              background: canSubmit ? "#4CAF50" : "#ccc",
              color: "#fff",
              cursor: canSubmit ? "pointer" : "default",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Create Tag
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Tag Hierarchy Page ---
export function TagHierarchyPage({
  userEmail,
  onBack,
  onMerchantLookup,
}: {
  userEmail: string;
  onBack: () => void;
  onMerchantLookup: (tagName: string) => void;
}) {
  const [tree, setTree] = useState(() => deepCloneTree(tagHierarchyData));
  const [search, setSearch] = useState("");
  const [movingNodeId, setMovingNodeId] = useState<string | null>(null);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const filteredTree = useMemo(() => filterTree(tree, search), [tree, search]);

  const handleRename = (nodeId: string, newLabel: string) => {
    setTree((prev) => renameInTree(prev, nodeId, newLabel));
  };

  const handleChangeId = (oldId: string, newId: string) => {
    setTree((prev) => changeIdInTree(prev, oldId, newId));
  };

  const handleCreateTag = (
    newId: string,
    newLabel: string,
    parentId: string,
  ) => {
    const newNode: TagNode = { id: newId, label: newLabel, children: [] };
    setTree((prev) => insertIntoTree(prev, parentId, newNode));
    setShowCreateTag(false);
  };

  const handleMoveConfirm = (nodeId: string, newParentId: string) => {
    setTree((prev) => {
      const nodeToMove = findNode(prev, nodeId);
      if (!nodeToMove) return prev;
      const subtree = deepCloneTree(nodeToMove);
      const removed = removeFromTree(prev, nodeId);
      if (!removed) return prev;
      return insertIntoTree(removed, newParentId, subtree);
    });
    setMovingNodeId(null);
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
        <span style={{ color: "#1a56db", cursor: "pointer" }}>accounts</span>
        <span>/</span>
        <span style={{ color: "#1a56db", cursor: "pointer" }}>{userEmail}</span>
        <span>/</span>
        <span style={{ color: "#1a56db" }}>merchants</span>
        <span>/</span>
        <span>tag-hierarchy</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h2
          style={{ fontSize: 18, fontWeight: 500, color: "#1a1a2e", margin: 0 }}
        >
          Tag Hierarchy
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setShowCreateTag(true)}
            style={{
              padding: "8px 24px",
              border: "none",
              borderRadius: 4,
              background: "#4CAF50",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Tag
          </button>
          <button
            onClick={onBack}
            style={{
              padding: "8px 24px",
              border: "1px solid #1a56db",
              borderRadius: 4,
              background: "#fff",
              color: "#1a56db",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Back to Merchants
          </button>
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 10 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Shop name or Tag name to search"
          style={{
            width: "100%",
            padding: "12px 40px 12px 16px",
            border: "1px solid #d0d5dd",
            borderRadius: 6,
            fontSize: 14,
            color: "#333",
            boxSizing: "border-box",
            outline: "none",
            background: "#fff",
          }}
        />
        <svg
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <div
        style={{
          marginBottom: 20,
          fontSize: 12,
          color: "#999",
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span>✏ Edit Tag</span>
        <span>↔ Move</span>
        <span>🔍 Merchant Lookup</span>
        <span style={{ color: "#bbb" }}>— hover a node to see actions</span>
      </div>

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          padding: "20px 16px",
          background: "#fafbfc",
        }}
      >
        {filteredTree ? (
          <TreeNode
            node={filteredTree}
            depth={0}
            onRename={handleRename}
            onMove={(id) => setMovingNodeId(id)}
            onChangeId={handleChangeId}
            onMerchantLookup={onMerchantLookup}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: 32,
              color: "#999",
              fontSize: 14,
            }}
          >
            No matching tags or shops found
          </div>
        )}
      </div>

      {movingNodeId && (
        <MoveModal
          tree={tree}
          movingNodeId={movingNodeId}
          onConfirm={handleMoveConfirm}
          onCancel={() => setMovingNodeId(null)}
        />
      )}

      {showCreateTag && (
        <CreateTagModal
          tree={tree}
          onConfirm={handleCreateTag}
          onCancel={() => setShowCreateTag(false)}
        />
      )}
    </div>
  );
}
