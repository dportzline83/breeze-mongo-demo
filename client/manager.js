(function(angular) {

	var app = angular.module('app');

	app.factory('manager', function() {
		var dataService = new breeze.DataService({serviceName: 'breeze'}),
			metadataStore = createMetadataStore(dataService),
			manager = new breeze.EntityManager({
				dataService: dataService,
				metadataStore: metadataStore }
			);

	  function createMetadataStore(dataService) {
			var store = new breeze.MetadataStore(),
				keyGen = breeze.AutoGeneratedKeyType.Identity,
				namespace = '',
				helper = new breeze.config.MetadataHelper(namespace, keyGen),
				addType = function(type) {
					helper.addTypeToStore(store, type);
				};

			addType({
				name: 'Person',
				dataProperties: {
					_id: {type: breeze.DataType.MongoObjectId, isPartOfKey: true},
					name: {max: 50},
					age: {type: breeze.DataType.Int32},
					status: {max: 50}
				}
			});
			store.addDataService(dataService);
			return store;
		}

		return manager;

	});
})(angular);