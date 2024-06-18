const CountryCode = require("../model/countryCodeModel");



let CountryCodeList = {};

const create = async (req, res) => {
    try {
        const FaqData = new CountryCode(req.body);
        // const uData = await CountryCode.insertMany(newRecord);
        const uData = await FaqData.save();
        // logger.info(JSON.stringify(uData));
        return res.status(201).send({ message: "CountryCode created", data: uData });
    } catch (error) {
        // logger.error(JSON.stringify(error));
        console.log(error);
        return res.status(500).send({ message: message.ServerError, success: 0 });
    }
};

const countries = async (req, res) => {
    //    const { id } = req.params;
    try {
        let countryCode = false;
        // if (id) {
        //     countryCode = await CountryCode.findById(id);
        // } else {
        if (Object.keys(CountryCodeList).length) {
            // logger.info(JSON.stringify(CountryCodeList));
            return res.status(200).send(CountryCodeList);
        }//
        countryCode = await CountryCode.find({}, {
            currency: 1,
            info: 1,
            phone: 1,
            _id: 1,
            name: 1,
            status: 1
        }).sort({ 'info.longName': 1 });
        // const targetIndex = countryCode.findIndex(item => item.info.longName === 'India');
        // const [removedItem] = countryCode.splice(targetIndex, 1);
        // countryCode.splice(0, 0, removedItem);
        const countryCodeList = { message: "CountryCode list", data: countryCode, status: true };
        // logger.info(JSON.stringify(countryCode));
        return res.status(200).send(countryCodeList);
        // }

    } catch (error) {
        // logger.error(JSON.stringify(error));
        console.log(error);
        return res.status(500).send({ message: "internal server", success: 0 });
    }
};

const update = async (req, res) => {
    console.log('Update');
    try {
        const { id } = req.params;

        const updatedData = req.body;
        // Update the document using updateOne
        const result = await CountryCode.updateOne({ "name": id }, { $set: updatedData });

        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: "CountryCode not found or not modified", success: 0, status: false });
        }

        const data = await CountryCode.findOne({ "name": id });
        return res.status(200).send({ message: "CountryCode updated", status: true, data: data, result });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: message.ServerError, success: 0, status: false });
    }
};


const getExcludeCountries = async (req, res) => {
    try {

        const countryCode = await CountryCode.find({ status: false }, {
            currency: 1,
            info: 1,
            phone: 1,
            _id: 1,
            name: 1,
            status: 1
        }).sort({ 'info.longName': 1 });
        const targetIndex = countryCode.findIndex(item => item.info.longName === 'India');
        const [removedItem] = countryCode.splice(targetIndex, 1);
        countryCode.splice(0, 0, removedItem);
        const excluded = { message: "Excluded CountryCode list", data: countryCode, status: true };
        // logger.info(JSON.stringify(countryCode));
        return res.status(200).send(excluded);


    } catch (error) {
        // logger.error(JSON.stringify(error));
        console.log(error);
        return res.status(500).send({ message: message.ServerError, success: 0 });
    }
};

const getCountries = async (req, res) => {
    try {
        const pageNo = (req.query.pageNo) ? (req.query.pageNo) : "";
        const key = (req.query.searchKey) ? (req.query.searchKey) : "";
        const startDate = (req.query.startDate) ? (req.query.startDate) : "";
        const endDate = (req.query.endDate) ? (req.query.endDate) : "";
        const pgLimit = (req.query.perPage) ? (req.query.perPage) : 10;

        let countryCode = false;

        // searching
        let objSearch = {};
        if (key) {
            objSearch = {
                $or: [
                    { "info.longName": { $regex: key, $options: "i" } }
                ]
            };
        }

        // Add date range filter if provided
        const dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        } else if (startDate) {
            dateFilter.createdAt = {
                $gte: new Date(startDate),
            };
        } else if (endDate) {
            dateFilter.createdAt = {
                $lte: new Date(endDate),
            };
        }

        // pagination
        let limit = pgLimit;
        let perPage = limit;
        let pageNumber = pageNo ? pageNo : 1;
        let offset = (pageNumber - 1) * limit;
        let currentPageNo = pageNumber;

        let countryCount = await CountryCode.countDocuments({});
        let count = countryCount;
        let totalCount = count;
        let remainingCount = totalCount - (offset + limit);
        if (remainingCount < 0) {
            remainingCount = 0;
        }

        countryCode = await CountryCode.find({}, {
            currency: 1,
            info: 1,
            phone: 1,
            _id: 1,
            name: 1,
            status: 1
        }).sort({ 'info.longName': 1 }).skip(offset).limit(limit);

        const targetIndex = countryCode.findIndex(item => item.info.longName === 'India');
        const [removedItem] = countryCode.splice(targetIndex, 1);
        countryCode.splice(0, 0, removedItem);

        if (objSearch && Object.keys(objSearch).length > 0) {
            count = await CountryCode.countDocuments(objSearch);
            totalCount = count;
            remainingCount = totalCount - (offset + limit);
            if (remainingCount < 0) {
                remainingCount = 0;
            }
            countryCode = await CountryCode.find(objSearch, {
                currency: 1,
                info: 1,
                phone: 1,
                _id: 1,
                name: 1,
                status: 1
            }).sort({ 'info.longName': 1 }).skip(offset).limit(limit);
            const targetIndex = countryCode.findIndex(item => item.info.longName === 'India');
            const [removedItem] = countryCode.splice(targetIndex, 1);
            countryCode.splice(0, 0, removedItem);
        } else if (dateFilter && Object.keys(dateFilter).length > 0) {
            count = await CountryCode.countDocuments(dateFilter);

            totalCount = count;
            remainingCount = totalCount - (offset + limit);
            if (remainingCount < 0) {
                remainingCount = 0;
            }
            countryCode = await CountryCode.find(dateFilter, {
                currency: 1,
                info: 1,
                phone: 1,
                _id: 1,
                name: 1,
                status: 1
            }).sort({ 'info.longName': 1 }).skip(offset).limit(limit)
            const targetIndex = countryCode.findIndex(item => item.info.longName === 'India');
            const [removedItem] = countryCode.splice(targetIndex, 1);
            countryCode.splice(0, 0, removedItem);
        }
        console.log(Array.isArray(countryCode) ? (countryCode[0] !== undefined ? countryCode : []) : []);


        res.status(200).send({
            message: "CountryCode Listing",
            status: true,
            sessionExist: "1",
            totalCount: totalCount,
            perPage: perPage,
            currentPageNo: currentPageNo,
            remainingCount: remainingCount,
            data: (Array.isArray(countryCode) ? (countryCode[0] !== undefined ? countryCode : []) : [])
        });
    } catch (err) {
        return res.status(400).send({ message: "Server Unavailable.", status: false, data: err.message });
    }
}

module.exports = { countries, update, create, getExcludeCountries, getCountries };
