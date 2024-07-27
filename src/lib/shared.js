function getRandomId() {
  return Date.now().toString(32) + Math.random().toString(36).slice(2, 9);
}

function _isFieldMetaRequired(describeMeta) {
  if (describeMeta.type === "number") {
    return true;
  }

  if (describeMeta.type === "object") {
    const isSomeRequired = Object.values(describeMeta.fields).some((fMeta) =>
      _isFieldMetaRequired(fMeta)
    );

    return isSomeRequired;
  }

  if (describeMeta.type === "array") {
    return !describeMeta.optional && !describeMeta.nullable;
  }

  return describeMeta?.tests?.some((t) => t.name === "required") ?? false;
}

function isFieldRequired(rules) {
  if (!Object.keys(rules).length) {
    return false;
  }

  const describeMeta = rules.describe();

  return _isFieldMetaRequired(describeMeta);
}

export { getRandomId, isFieldRequired };
