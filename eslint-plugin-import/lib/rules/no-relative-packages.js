'use strict';var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _readPkgUp = require('eslint-module-utils/readPkgUp');var _readPkgUp2 = _interopRequireDefault(_readPkgUp);

var _resolve = require('eslint-module-utils/resolve');var _resolve2 = _interopRequireDefault(_resolve);
var _moduleVisitor = require('eslint-module-utils/moduleVisitor');var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);
var _importType = require('../core/importType');var _importType2 = _interopRequireDefault(_importType);
var _docsUrl = require('../docsUrl');var _docsUrl2 = _interopRequireDefault(_docsUrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}

/** @param {string} filePath */
function toPosixPath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function findNamedPackage(filePath) {
  var found = (0, _readPkgUp2['default'])({ cwd: filePath });
  if (found.pkg && !found.pkg.name) {
    return findNamedPackage(_path2['default'].join(found.path, '../..'));
  }
  return found;
}

function checkImportForRelativePackage(context, importPath, node) {
  var potentialViolationTypes = ['parent', 'index', 'sibling'];
  if (potentialViolationTypes.indexOf((0, _importType2['default'])(importPath, context)) === -1) {
    return;
  }

  var resolvedImport = (0, _resolve2['default'])(importPath, context);
  var resolvedContext = context.getPhysicalFilename ? context.getPhysicalFilename() : context.getFilename();

  if (!resolvedImport || !resolvedContext) {
    return;
  }

  var importPkg = findNamedPackage(resolvedImport);
  var contextPkg = findNamedPackage(resolvedContext);

  if (importPkg.pkg && contextPkg.pkg && importPkg.pkg.name !== contextPkg.pkg.name) {
    var importBaseName = _path2['default'].basename(importPath);
    var importRoot = _path2['default'].dirname(importPkg.path);
    var properPath = _path2['default'].relative(importRoot, resolvedImport);
    var properImport = _path2['default'].join(
    importPkg.pkg.name,
    _path2['default'].dirname(properPath),
    importBaseName === _path2['default'].basename(importRoot) ? '' : importBaseName);

    context.report({
      node: node,
      message: 'Relative import from another package is not allowed. Use `' + String(properImport) + '` instead of `' + String(importPath) + '`',
      fix: function () {function fix(fixer) {return fixer.replaceText(node, JSON.stringify(toPosixPath(properImport)));}return fix;}() });


  }
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2['default'])('no-relative-packages') },

    fixable: 'code',
    schema: [(0, _moduleVisitor.makeOptionsSchema)()] },


  create: function () {function create(context) {
      return (0, _moduleVisitor2['default'])(function (source) {return checkImportForRelativePackage(context, source.value, source);}, context.options[0]);
    }return create;}() };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1yZWxhdGl2ZS1wYWNrYWdlcy5qcyJdLCJuYW1lcyI6WyJ0b1Bvc2l4UGF0aCIsImZpbGVQYXRoIiwicmVwbGFjZSIsImZpbmROYW1lZFBhY2thZ2UiLCJmb3VuZCIsImN3ZCIsInBrZyIsIm5hbWUiLCJwYXRoIiwiam9pbiIsImNoZWNrSW1wb3J0Rm9yUmVsYXRpdmVQYWNrYWdlIiwiY29udGV4dCIsImltcG9ydFBhdGgiLCJub2RlIiwicG90ZW50aWFsVmlvbGF0aW9uVHlwZXMiLCJpbmRleE9mIiwicmVzb2x2ZWRJbXBvcnQiLCJyZXNvbHZlZENvbnRleHQiLCJnZXRQaHlzaWNhbEZpbGVuYW1lIiwiZ2V0RmlsZW5hbWUiLCJpbXBvcnRQa2ciLCJjb250ZXh0UGtnIiwiaW1wb3J0QmFzZU5hbWUiLCJiYXNlbmFtZSIsImltcG9ydFJvb3QiLCJkaXJuYW1lIiwicHJvcGVyUGF0aCIsInJlbGF0aXZlIiwicHJvcGVySW1wb3J0IiwicmVwb3J0IiwibWVzc2FnZSIsImZpeCIsImZpeGVyIiwicmVwbGFjZVRleHQiLCJKU09OIiwic3RyaW5naWZ5IiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsImZpeGFibGUiLCJzY2hlbWEiLCJjcmVhdGUiLCJzb3VyY2UiLCJ2YWx1ZSIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiJhQUFBLDRCO0FBQ0EsMEQ7O0FBRUEsc0Q7QUFDQSxrRTtBQUNBLGdEO0FBQ0EscUM7O0FBRUE7QUFDQSxTQUFTQSxXQUFULENBQXFCQyxRQUFyQixFQUErQjtBQUM3QixTQUFPQSxTQUFTQyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxnQkFBVCxDQUEwQkYsUUFBMUIsRUFBb0M7QUFDbEMsTUFBTUcsUUFBUSw0QkFBVSxFQUFFQyxLQUFLSixRQUFQLEVBQVYsQ0FBZDtBQUNBLE1BQUlHLE1BQU1FLEdBQU4sSUFBYSxDQUFDRixNQUFNRSxHQUFOLENBQVVDLElBQTVCLEVBQWtDO0FBQ2hDLFdBQU9KLGlCQUFpQkssa0JBQUtDLElBQUwsQ0FBVUwsTUFBTUksSUFBaEIsRUFBc0IsT0FBdEIsQ0FBakIsQ0FBUDtBQUNEO0FBQ0QsU0FBT0osS0FBUDtBQUNEOztBQUVELFNBQVNNLDZCQUFULENBQXVDQyxPQUF2QyxFQUFnREMsVUFBaEQsRUFBNERDLElBQTVELEVBQWtFO0FBQ2hFLE1BQU1DLDBCQUEwQixDQUFDLFFBQUQsRUFBVyxPQUFYLEVBQW9CLFNBQXBCLENBQWhDO0FBQ0EsTUFBSUEsd0JBQXdCQyxPQUF4QixDQUFnQyw2QkFBV0gsVUFBWCxFQUF1QkQsT0FBdkIsQ0FBaEMsTUFBcUUsQ0FBQyxDQUExRSxFQUE2RTtBQUMzRTtBQUNEOztBQUVELE1BQU1LLGlCQUFpQiwwQkFBUUosVUFBUixFQUFvQkQsT0FBcEIsQ0FBdkI7QUFDQSxNQUFNTSxrQkFBa0JOLFFBQVFPLG1CQUFSLEdBQThCUCxRQUFRTyxtQkFBUixFQUE5QixHQUE4RFAsUUFBUVEsV0FBUixFQUF0Rjs7QUFFQSxNQUFJLENBQUNILGNBQUQsSUFBbUIsQ0FBQ0MsZUFBeEIsRUFBeUM7QUFDdkM7QUFDRDs7QUFFRCxNQUFNRyxZQUFZakIsaUJBQWlCYSxjQUFqQixDQUFsQjtBQUNBLE1BQU1LLGFBQWFsQixpQkFBaUJjLGVBQWpCLENBQW5COztBQUVBLE1BQUlHLFVBQVVkLEdBQVYsSUFBaUJlLFdBQVdmLEdBQTVCLElBQW1DYyxVQUFVZCxHQUFWLENBQWNDLElBQWQsS0FBdUJjLFdBQVdmLEdBQVgsQ0FBZUMsSUFBN0UsRUFBbUY7QUFDakYsUUFBTWUsaUJBQWlCZCxrQkFBS2UsUUFBTCxDQUFjWCxVQUFkLENBQXZCO0FBQ0EsUUFBTVksYUFBYWhCLGtCQUFLaUIsT0FBTCxDQUFhTCxVQUFVWixJQUF2QixDQUFuQjtBQUNBLFFBQU1rQixhQUFhbEIsa0JBQUttQixRQUFMLENBQWNILFVBQWQsRUFBMEJSLGNBQTFCLENBQW5CO0FBQ0EsUUFBTVksZUFBZXBCLGtCQUFLQyxJQUFMO0FBQ25CVyxjQUFVZCxHQUFWLENBQWNDLElBREs7QUFFbkJDLHNCQUFLaUIsT0FBTCxDQUFhQyxVQUFiLENBRm1CO0FBR25CSix1QkFBbUJkLGtCQUFLZSxRQUFMLENBQWNDLFVBQWQsQ0FBbkIsR0FBK0MsRUFBL0MsR0FBb0RGLGNBSGpDLENBQXJCOztBQUtBWCxZQUFRa0IsTUFBUixDQUFlO0FBQ2JoQixnQkFEYTtBQUViaUIscUZBQXVFRixZQUF2RSw4QkFBc0doQixVQUF0RyxPQUZhO0FBR2JtQix3QkFBSyw0QkFBU0MsTUFBTUMsV0FBTixDQUFrQnBCLElBQWxCLEVBQXdCcUIsS0FBS0MsU0FBTCxDQUFlbkMsWUFBWTRCLFlBQVosQ0FBZixDQUF4QixDQUFULEVBQUwsY0FIYSxFQUFmOzs7QUFNRDtBQUNGOztBQUVEUSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTSxZQURGO0FBRUpDLFVBQU07QUFDSkMsV0FBSywwQkFBUSxzQkFBUixDQURELEVBRkY7O0FBS0pDLGFBQVMsTUFMTDtBQU1KQyxZQUFRLENBQUMsdUNBQUQsQ0FOSixFQURTOzs7QUFVZkMsUUFWZSwrQkFVUmpDLE9BVlEsRUFVQztBQUNkLGFBQU8sZ0NBQWMsVUFBQ2tDLE1BQUQsVUFBWW5DLDhCQUE4QkMsT0FBOUIsRUFBdUNrQyxPQUFPQyxLQUE5QyxFQUFxREQsTUFBckQsQ0FBWixFQUFkLEVBQXdGbEMsUUFBUW9DLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBeEYsQ0FBUDtBQUNELEtBWmMsbUJBQWpCIiwiZmlsZSI6Im5vLXJlbGF0aXZlLXBhY2thZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcmVhZFBrZ1VwIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvcmVhZFBrZ1VwJztcblxuaW1wb3J0IHJlc29sdmUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJztcbmltcG9ydCBtb2R1bGVWaXNpdG9yLCB7IG1ha2VPcHRpb25zU2NoZW1hIH0gZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9tb2R1bGVWaXNpdG9yJztcbmltcG9ydCBpbXBvcnRUeXBlIGZyb20gJy4uL2NvcmUvaW1wb3J0VHlwZSc7XG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJztcblxuLyoqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aCAqL1xuZnVuY3Rpb24gdG9Qb3NpeFBhdGgoZmlsZVBhdGgpIHtcbiAgcmV0dXJuIGZpbGVQYXRoLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbn1cblxuZnVuY3Rpb24gZmluZE5hbWVkUGFja2FnZShmaWxlUGF0aCkge1xuICBjb25zdCBmb3VuZCA9IHJlYWRQa2dVcCh7IGN3ZDogZmlsZVBhdGggfSk7XG4gIGlmIChmb3VuZC5wa2cgJiYgIWZvdW5kLnBrZy5uYW1lKSB7XG4gICAgcmV0dXJuIGZpbmROYW1lZFBhY2thZ2UocGF0aC5qb2luKGZvdW5kLnBhdGgsICcuLi8uLicpKTtcbiAgfVxuICByZXR1cm4gZm91bmQ7XG59XG5cbmZ1bmN0aW9uIGNoZWNrSW1wb3J0Rm9yUmVsYXRpdmVQYWNrYWdlKGNvbnRleHQsIGltcG9ydFBhdGgsIG5vZGUpIHtcbiAgY29uc3QgcG90ZW50aWFsVmlvbGF0aW9uVHlwZXMgPSBbJ3BhcmVudCcsICdpbmRleCcsICdzaWJsaW5nJ107XG4gIGlmIChwb3RlbnRpYWxWaW9sYXRpb25UeXBlcy5pbmRleE9mKGltcG9ydFR5cGUoaW1wb3J0UGF0aCwgY29udGV4dCkpID09PSAtMSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlc29sdmVkSW1wb3J0ID0gcmVzb2x2ZShpbXBvcnRQYXRoLCBjb250ZXh0KTtcbiAgY29uc3QgcmVzb2x2ZWRDb250ZXh0ID0gY29udGV4dC5nZXRQaHlzaWNhbEZpbGVuYW1lID8gY29udGV4dC5nZXRQaHlzaWNhbEZpbGVuYW1lKCkgOiBjb250ZXh0LmdldEZpbGVuYW1lKCk7XG5cbiAgaWYgKCFyZXNvbHZlZEltcG9ydCB8fCAhcmVzb2x2ZWRDb250ZXh0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW1wb3J0UGtnID0gZmluZE5hbWVkUGFja2FnZShyZXNvbHZlZEltcG9ydCk7XG4gIGNvbnN0IGNvbnRleHRQa2cgPSBmaW5kTmFtZWRQYWNrYWdlKHJlc29sdmVkQ29udGV4dCk7XG5cbiAgaWYgKGltcG9ydFBrZy5wa2cgJiYgY29udGV4dFBrZy5wa2cgJiYgaW1wb3J0UGtnLnBrZy5uYW1lICE9PSBjb250ZXh0UGtnLnBrZy5uYW1lKSB7XG4gICAgY29uc3QgaW1wb3J0QmFzZU5hbWUgPSBwYXRoLmJhc2VuYW1lKGltcG9ydFBhdGgpO1xuICAgIGNvbnN0IGltcG9ydFJvb3QgPSBwYXRoLmRpcm5hbWUoaW1wb3J0UGtnLnBhdGgpO1xuICAgIGNvbnN0IHByb3BlclBhdGggPSBwYXRoLnJlbGF0aXZlKGltcG9ydFJvb3QsIHJlc29sdmVkSW1wb3J0KTtcbiAgICBjb25zdCBwcm9wZXJJbXBvcnQgPSBwYXRoLmpvaW4oXG4gICAgICBpbXBvcnRQa2cucGtnLm5hbWUsXG4gICAgICBwYXRoLmRpcm5hbWUocHJvcGVyUGF0aCksXG4gICAgICBpbXBvcnRCYXNlTmFtZSA9PT0gcGF0aC5iYXNlbmFtZShpbXBvcnRSb290KSA/ICcnIDogaW1wb3J0QmFzZU5hbWUsXG4gICAgKTtcbiAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICBub2RlLFxuICAgICAgbWVzc2FnZTogYFJlbGF0aXZlIGltcG9ydCBmcm9tIGFub3RoZXIgcGFja2FnZSBpcyBub3QgYWxsb3dlZC4gVXNlIFxcYCR7cHJvcGVySW1wb3J0fVxcYCBpbnN0ZWFkIG9mIFxcYCR7aW1wb3J0UGF0aH1cXGBgLFxuICAgICAgZml4OiBmaXhlciA9PiBmaXhlci5yZXBsYWNlVGV4dChub2RlLCBKU09OLnN0cmluZ2lmeSh0b1Bvc2l4UGF0aChwcm9wZXJJbXBvcnQpKSlcbiAgICAgICxcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ25vLXJlbGF0aXZlLXBhY2thZ2VzJyksXG4gICAgfSxcbiAgICBmaXhhYmxlOiAnY29kZScsXG4gICAgc2NoZW1hOiBbbWFrZU9wdGlvbnNTY2hlbWEoKV0sXG4gIH0sXG5cbiAgY3JlYXRlKGNvbnRleHQpIHtcbiAgICByZXR1cm4gbW9kdWxlVmlzaXRvcigoc291cmNlKSA9PiBjaGVja0ltcG9ydEZvclJlbGF0aXZlUGFja2FnZShjb250ZXh0LCBzb3VyY2UudmFsdWUsIHNvdXJjZSksIGNvbnRleHQub3B0aW9uc1swXSk7XG4gIH0sXG59O1xuIl19